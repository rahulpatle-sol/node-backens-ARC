import emailQueue from './queue.js';

// 3 email jobs add karo
await emailQueue.add('welcome-email', {
    to: 'rahul@gmail.com',
    subject: 'Welcome!',
    body: 'Thanks for registering!'
});

await emailQueue.add('welcome-email', {
    to: 'amit@gmail.com',
    subject: 'Welcome!',
    body: 'Thanks for registering!'
});

await emailQueue.add('promo-email', {
    to: 'rahul@gmail.com',
    subject: 'Special Offer!',
    body: '50% off today!'
});
//  attempt  based 

await emailQueue.add('welcome-email',{
    to:"rahul@gmail.com",
    subject:'Welcome',
},{
    attempts:3,
    backoff:{
        type:'exponential',
        delay:1000

    }
})

console.log('3 jobs added to queue!');
process.exit(0);