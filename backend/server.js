import dotenv from 'dotenv';
dotenv.config();

import app from './src/app.js';
import { connectDB } from './src/config/db.js';

const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas (if MONGODB_URI is provided)
connectDB();

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[MIRAE SERVER] Running on port ${PORT}`);
  console.log(`[MIRAE API] Health check at /api/health`);
});

