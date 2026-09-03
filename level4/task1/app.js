import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import errorHandler from './auth/middleware/errorHandler.js';
import authRoutes from './auth/routes/auth.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use(errorHandler);

export default app;