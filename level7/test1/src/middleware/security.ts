import helmet from "helmet";
// cors does not currently provide TypeScript declarations in this project.
// @ts-expect-error: `cors` is an untyped JavaScript dependency.
import cors from 'cors';
import rateLimit from 'express-rate-limit';

import type { Express } from "express";

export const applySecurityMiddleware=(app:Express)=>{

    //  use of helmet http heasdr securit

    app.use(helmet());
    //  cors securtit

    app.use(cors({
        origin:['http://localhsot:3000','http://localhost:5173'],
        methods:['GET','POST','PUT','DELETE'],
        allowedHeaders:['Content_Type',"Authorization"]
    }));


//  rate limitiing

app.use(rateLimit({
    windowMs:60*1000,
    max:10,
    message:{
        message:'Too many request try again'
    }
}))

};

