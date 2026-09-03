import redis from '../db/redis.js';

const rateLimiter = async (req, res, next) => {
  try {
    const ip = req.ip;
    const key = `rate:${ip}`;
    const limit = 10;
    const window = 60;

    const requests = await redis.incr(key);

    if (requests === 1) {
      await redis.expire(key, window);
    }

    if (requests > limit) {
      return res.status(429).json({
        message: `Too many requests. Limit: ${limit} per minute.`,
      });
    }

    res.setHeader('X-RateLimit-Limit', limit);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, limit - requests));

    next();
  } catch (error) {
    next(error);
  }
};

export default rateLimiter;