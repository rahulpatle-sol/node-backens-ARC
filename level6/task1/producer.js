import { Queue } from 'bullmq';
import dotenv from 'dotenv';
dotenv.config();

const connection = { host: 'localhost', port: 6379 };

const emailQueue = new Queue('email-queue', { connection });

await emailQueue.add('critical-alert', {
    to: 'rahul@gmail.com',
    subject: 'Critical Alert!'
}, {
    attempts: 3,
    backoff: {
        type: 'fixed',
        delay: 2000
    }
});

console.log('Job added — 3 attempts!');
await emailQueue.close();
process.exit(0);