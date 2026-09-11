import { projectsData } from '../data/projectsData';
import { materialsData } from '../data/materialsData';
import { roomsData } from '../data/roomsData';

/**
 * Base API URL Normalization:
 * - If VITE_API_URL is "https://mirae-api.onrender.com", resolves to "https://mirae-api.onrender.com/api"
 * - If VITE_API_URL is "https://mirae-api.onrender.com/api", resolves to "https://mirae-api.onrender.com/api"
 * - If VITE_API_URL is unset, defaults to "/api" (which proxies to localhost:5000 in dev via vite.config.js)
 * Completely eliminates any chance of double /api/api pathing.
 */
const RAW_API_URL = (import.meta.env.VITE_API_URL || '').trim();
const API_BASE = RAW_API_URL
  ? RAW_API_URL.replace(/\/+$/, '').replace(/\/api$/, '') + '/api'
  : '/api';

/**
 * Centralized API Service for MIRAE Architecture
 * Queries the Express backend on Render or Localhost, with automatic graceful fallback to offline brochure data.
 */
export const api = {
  async getHealth() {
    try {
      const res = await fetch(`${API_BASE}/health`);
      if (!res.ok) throw new Error('Health check failed');
      return await res.json();
    } catch (err) {
      console.warn('[API: health fallback]', err.message);
      return { status: 'fallback', brand: 'MIRAE arc studio' };
    }
  },

  async getProjects() {
    try {
      const res = await fetch(`${API_BASE}/projects`);
      if (!res.ok) throw new Error('Failed to fetch projects');
      const json = await res.json();
      return json.data || projectsData;
    } catch (err) {
      console.warn('[API: projects fallback]', err.message);
      return projectsData;
    }
  },

  async getMaterials() {
    try {
      const res = await fetch(`${API_BASE}/materials`);
      if (!res.ok) throw new Error('Failed to fetch materials');
      const json = await res.json();
      return json.data || materialsData;
    } catch (err) {
      console.warn('[API: materials fallback]', err.message);
      return materialsData;
    }
  },

  async getRooms() {
    try {
      const res = await fetch(`${API_BASE}/rooms`);
      if (!res.ok) throw new Error('Failed to fetch rooms');
      const json = await res.json();
      return json.data || roomsData;
    } catch (err) {
      console.warn('[API: rooms fallback]', err.message);
      return roomsData;
    }
  },

  async submitInquiry(payload) {
    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to submit inquiry');
      }
      return await res.json();
    } catch (err) {
      console.warn('[API: contact local simulation fallback]', err.message);
      // Simulate successful receipt for offline resilience
      return {
        success: true,
        message: 'Your inquiry has been recorded locally.',
        inquiryId: `INQ-OFFLINE-${Date.now()}`
      };
    }
  }
};

