import { Worker } from 'bullmq';
import dotenv from 'dotenv';
dotenv.config();

const connection = { host: 'localhost', port: 6379 };

const worker = new Worker('email-queue', async (job) => {
    console.log(`📧 Processing: ${job.name}`);
    console.log(`To: ${job.data.to}`);
    console.log(`Subject: ${job.data.subject}`);

    await new Promise(r => setTimeout(r, 1000));

    console.log(`✅ Email sent to ${job.data.to}`);
    return { success: true };
}, { connection });

worker.on('completed', (job) => {
    console.log(`✅ Job ${job.id} done!`);
});

worker.on('failed', (job, err) => {
    console.error(`❌ Job ${job.id} failed: ${err.message}`);
});

console.log('Worker ready...');