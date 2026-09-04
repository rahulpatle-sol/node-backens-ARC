//  connection  for bullmq


import {Queue} from 'bullmq';

const connection={
    host:'localhost',
    port:6379
};

const  emailQueue=new Queue('email-queue',{
    connection
});

export default emailQueue;

