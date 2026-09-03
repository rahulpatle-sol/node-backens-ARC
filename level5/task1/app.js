import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import usersRouter from './routes/Users.js';
import errorHandler from '../../level4/task1/auth/middleware/errorHandler.js';
import rateLimiter from './middlewares/rateLimiter.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(rateLimiter);
app.use('/api', usersRouter);


app.use(errorHandler);

export default app;