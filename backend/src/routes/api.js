import express from 'express';
import { projectsData } from '../data/projectsData.js';
import { materialsData } from '../data/materialsData.js';
import { roomsData } from '../data/roomsData.js';
import { getDBStatus } from '../config/db.js';
import { Project } from '../models/Project.js';
import { Inquiry } from '../models/Inquiry.js';

const router = express.Router();

// System Health Check (Never exposes database credentials or connection string)
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    brand: process.env.STUDIO_BRAND || 'MIRAE arc studio',
    infra: 'PMR INFRA LLP',
    location: process.env.STUDIO_LOCATION || 'Malappuram, Kerala',
    database: getDBStatus(),
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Projects API with MongoDB Atlas query and graceful dataset fallback
router.get('/projects', async (req, res) => {
  try {
    if (getDBStatus() === 'connected') {
      let projects = await Project.find({}).sort({ num: 1 }).lean();

      // Auto-seed Atlas database if empty
      if (!projects || projects.length === 0) {
        console.log('[DATABASE SEED] Seeding Atlas with MIRAE architecture projects collection...');
        await Project.insertMany(projectsData);
        projects = await Project.find({}).sort({ num: 1 }).lean();
      }

      if (projects && projects.length > 0) {
        return res.json({
          success: true,
          source: 'mongodb',
          count: projects.length,
          data: projects
        });
      }
    }
  } catch (err) {
    console.warn('[DATABASE READ WARNING] Failed to query Atlas projects, using static fallback:', err.message);
  }

  // Fallback to static dataset
  res.json({
    success: true,
    source: 'brochure_dataset',
    count: projectsData.length,
    data: projectsData
  });
});

// Single Project API
router.get('/projects/:id', async (req, res) => {
  const { id } = req.params;

  try {
    if (getDBStatus() === 'connected') {
      const project = await Project.findOne({
        $or: [{ id }, { num: id }]
      }).lean();

      if (project) {
        return res.json({ success: true, source: 'mongodb', data: project });
      }
    }
  } catch (err) {
    console.warn('[DATABASE READ WARNING] Failed to query Atlas project by ID:', err.message);
  }

  // Fallback
  const fallbackProject = projectsData.find(p => p.id === id || p.num === id);
  if (!fallbackProject) {
    return res.status(404).json({ success: false, message: 'Project not found' });
  }

  res.json({ success: true, source: 'brochure_dataset', data: fallbackProject });
});

// Materials API
router.get('/materials', (req, res) => {
  res.json({
    success: true,
    count: materialsData.length,
    data: materialsData
  });
});

// Interior Rooms API
router.get('/rooms', (req, res) => {
  res.json({
    success: true,
    count: roomsData.length,
    data: roomsData
  });
});

// Commission Inquiries API with Atlas persistence and resilient fallback
router.post('/contact', async (req, res) => {
  const { name, email, phone, projectType, message } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, and phone number are required fields.'
    });
  }

  const inquiryId = `INQ-${Date.now()}`;
  let savedToDB = false;

  if (getDBStatus() === 'connected') {
    try {
      const inquiryDoc = new Inquiry({
        inquiryId,
        name,
        email,
        phone,
        projectType: projectType || 'Private Residence',
        message: message || '',
        status: 'PENDING_REVIEW',
        receivedAt: new Date()
      });
      await inquiryDoc.save();
      savedToDB = true;
      console.log(`[MIRAE INQUIRY RECORDED TO MONGODB]: ${inquiryId} by ${name}`);
    } catch (err) {
      console.error('[DATABASE INQUIRY SAVE ERROR]:', err.message);
    }
  }

  if (!savedToDB) {
    console.log(`[MIRAE INQUIRY LOGGED LOCALLY]: ${inquiryId} by ${name} (${email})`);
  }

  res.status(201).json({
    success: true,
    message: 'Thank you. Your architectural inquiry has been recorded by MIRAE arc studio.',
    inquiryId,
    stored: savedToDB ? 'atlas' : 'local'
  });
});

export default router;
