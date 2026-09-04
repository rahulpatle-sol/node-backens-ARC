//  makin  data pipeline 


import {Queue} from 'bullmq';


import dotenv from 'dotenv';


dotenv.config();

//  build connection 


const  connection={
    host:'localhost',
    port:6379
};


const emailQueue=new Queue('email-queue',{connection});


export default emailQueue;
