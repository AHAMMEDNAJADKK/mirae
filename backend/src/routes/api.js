import express from 'express';
import { projectsData } from '../data/projectsData.js';
import { materialsData } from '../data/materialsData.js';
import { roomsData } from '../data/roomsData.js';

const router = express.Router();

// System Health Check
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    brand: process.env.STUDIO_BRAND || 'MIRAE arc studio',
    infra: 'PMR INFRA LLP',
    location: process.env.STUDIO_LOCATION || 'Malappuram, Kerala',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Projects API
router.get('/projects', (req, res) => {
  res.json({
    success: true,
    count: projectsData.length,
    data: projectsData
  });
});

// Single Project API
router.get('/projects/:id', (req, res) => {
  const project = projectsData.find(p => p.id === req.params.id || p.num === req.params.id);
  if (!project) {
    return res.status(404).json({ success: false, message: 'Project not found' });
  }
  res.json({ success: true, data: project });
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

// Commission Inquiries API
router.post('/contact', (req, res) => {
  const { name, email, phone, projectType, message } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, and phone number are required fields.'
    });
  }

  const inquiry = {
    id: `INQ-${Date.now()}`,
    name,
    email,
    phone,
    projectType: projectType || 'Private Residence',
    message: message || '',
    receivedAt: new Date().toISOString(),
    status: 'PENDING_REVIEW'
  };

  console.log('[MIRAE INQUIRY RECEIVED]:', inquiry);

  res.status(201).json({
    success: true,
    message: 'Thank you. Your architectural inquiry has been recorded by MIRAE arc studio.',
    inquiryId: inquiry.id
  });
});

export default router;
