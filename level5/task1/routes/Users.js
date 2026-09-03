import express from 'express';
import redis from '../db/redis.js';
import User from '../model/User.js';

const router = express.Router();

router.get('/users', async (req, res, next) => {
    try {
        // 1. Cache check karo
        const cached = await redis.get('users');
        if (cached) {
            console.log('CACHE HIT');
            return res.status(200).json(JSON.parse(cached));
        }

        // 2. DB se lo
        console.log('CACHE MISS — DB se la raha hoon');
        const users = await User.find().select('-password');

        // 3. Cache mein save karo — 60 seconds
        await redis.set('users', JSON.stringify(users), 'EX', 60);

        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
});

export default router;