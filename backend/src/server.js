import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRoutes from './routes/api.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', apiRoutes);

// In production, serve frontend dist
const distPath = path.join(__dirname, '../../frontend/dist');
app.use(express.static(distPath));

// SPA Catch-all fallback for client-side routing in Express 5
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
    return res.sendFile(path.join(distPath, 'index.html'));
  }
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('[SERVER ERROR]:', err);
  res.status(500).json({
    success: false,
    message: 'Internal architectural server error.'
  });
});

app.listen(PORT, () => {
  console.log(`[MIRAE SERVER] Running on http://localhost:${PORT}`);
  console.log(`[MIRAE API] Health check at http://localhost:${PORT}/api/health`);
});
