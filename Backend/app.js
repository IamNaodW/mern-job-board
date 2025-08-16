import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';

import { errorHandler } from './middleware/errorMiddleware.js';

import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();

// CORS config
const corsOptions = {
  origin: ['http://localhost:5173', 'https://yourfrontend.com'],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Logging
app.use(morgan('dev'));

// Body parser
app.use(express.json());

// Rate limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api/', apiLimiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api', applicationRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);

export default app;
