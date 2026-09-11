import mongoose from 'mongoose';

let isConnected = false;

/**
 * Robust MongoDB Atlas Connection Manager
 * - Reads MONGODB_URI strictly from environment variables
 * - Never logs or exposes connection strings, credentials, or secrets
 * - Provides graceful degradation if URI is missing (offline brochure mode)
 * - Uses connection pooling with serverSelectionTimeoutMS
 */
export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn('[DATABASE WARNING] MONGODB_URI environment variable is not defined.');
    console.warn('[DATABASE WARNING] Server operating in offline brochure mode (fallback datasets active).');
    return false;
  }

  if (isConnected || mongoose.connection.readyState === 1) {
    return true;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log(`[DATABASE] MongoDB Atlas connected successfully (Host: ${conn.connection.host})`);
    return true;
  } catch (error) {
    // Log safe error message only — NEVER log the full URI or credentials
    console.error(`[DATABASE ERROR] MongoDB Atlas connection failed: ${error.message}`);
    console.warn('[DATABASE WARNING] Continuing server startup with offline fallback data.');
    return false;
  }
};

export const getDBStatus = () => {
  const state = mongoose.connection.readyState;
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };
  return states[state] || 'unknown';
};
