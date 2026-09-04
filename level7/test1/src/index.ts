import express from 'express';
import { applySecurityMiddleware } from './middleware/security.js';
import userRouter from './routes/users.js';

const app = express();
app.use(express.json());

// Security apply karo
applySecurityMiddleware(app);

// Routes
app.use('/api', userRouter);

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});