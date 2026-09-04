import { Worker } from 'bullmq';
import dotenv from 'dotenv';
dotenv.config();

const connection = { host: 'localhost', port: 6379 };

const worker = new Worker('email-queue', async (job) => {
    console.log(`Attempt ${job.attemptsMade + 1} of ${job.opts.attempts}`);

    if (job.attemptsMade < 2) {
        throw new Error(`Server down — attempt ${job.attemptsMade + 1}`);
    }

    console.log(`✅ Email sent to ${job.data.to}`);
    return { success: true };

}, { connection });

worker.on('completed', (job) => {
    console.log(`✅ Job completed after ${job.attemptsMade} retries!`);
});

worker.on('failed', (job, err) => {
    console.error(`❌ Permanently failed: ${err.message}`);
});


// worker alive rakho

console.log('Worker started — waiting for jobs...');
process.on('SIGINT', async () => {
    await worker.close();
    process.exit(0);
});