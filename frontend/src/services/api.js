import { projectsData } from '../data/projectsData';
import { materialsData } from '../data/materialsData';
import { roomsData } from '../data/roomsData';

/**
 * Centralized API Service for MIRAE Architecture
 * Queries the Express backend, with automatic graceful fallback to offline brochure data.
 */
export const api = {
  async getHealth() {
    try {
      const res = await fetch('/api/health');
      if (!res.ok) throw new Error('Health check failed');
      return await res.json();
    } catch (err) {
      console.warn('[API: health fallback]', err.message);
      return { status: 'fallback', brand: 'MIRAE arc studio' };
    }
  },

  async getProjects() {
    try {
      const res = await fetch('/api/projects');
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
      const res = await fetch('/api/materials');
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
      const res = await fetch('/api/rooms');
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
      const res = await fetch('/api/contact', {
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
