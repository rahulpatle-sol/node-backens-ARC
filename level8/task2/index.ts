import express from 'express';
import mongoose from 'mongoose';
import Redis from 'ioredis';

const app = express();
app.use(express.json());

// MongoDB connect
await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/appdb');
console.log('MongoDB connected!');

// Redis connect
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
redis.on('connect', () => console.log('Redis connected!'));

app.get('/', (req, res) => {
    res.json({
        message: 'Hello from Docker Compose!',
        environment: process.env.NODE_ENV
    });
});

app.get('/health', async (req, res) => {
    await redis.set('health', 'ok');
    const val = await redis.get('health');
    res.json({
        status: 'ok',
        redis: val,
        mongo: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});