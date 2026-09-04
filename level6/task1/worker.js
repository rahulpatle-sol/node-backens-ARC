//  workert is picking up  the job  and excuting'


import {Worker} from 'bullmq';


import dotenv from 'dotenv'
dotenv.config();


const connection={
    host:'localhost',
    port:6379
}

const worker = new Worker('email-queue', async (job) => {
    console.log(`Processing job: ${job.name}`);
    console.log(`To: ${job.data.to}`);
    console.log(`Subject: ${job.data.subject}`);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(`✅ Email sent to ${job.data.to}`);
    return { success: true, sentTo: job.data.to };
}, {
    connection,
    concurrency: 1
});


worker.on('completed',(job)=>{
    console.log(`job  ${job.id} completed`)
})

//  failure

worker.on('failed', (job, err) => {
    console.error(`Job ${job.id} failed:`, err.message);
});

console.log('Worker started — waiting for jobs...');