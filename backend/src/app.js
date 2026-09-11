import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRoutes from './routes/api.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Dynamic CORS configuration for local development and production deployments (Vercel & Render)
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5000',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (such as health checkers, server-to-server, curl)
      if (!origin) return callback(null, true);

      // Check allowed list
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Allow any *.vercel.app deployment preview
      try {
        const parsed = new URL(origin);
        if (parsed.hostname.endsWith('.vercel.app')) {
          return callback(null, true);
        }
      } catch {
        // invalid URL format, ignore
      }

      // In non-production environments, allow origin for easier developer testing
      if (process.env.NODE_ENV !== 'production') {
        return callback(null, true);
      }

      return callback(new Error(`Origin ${origin} not allowed by CORS policy`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
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

export default app;
