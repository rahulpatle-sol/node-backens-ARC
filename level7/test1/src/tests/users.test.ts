//  testing of =api 


import {describe,it,expect,beforeAll} from 'bun:test';

import request from 'supertest';
import express, { Router } from 'express';

import { applySecurityMiddleware } from '../middleware/security';

import userRouter from  '../routes/users.ts';


const app=express();


app.use(express.json());
applySecurityMiddleware(app);
app.use('/api',userRouter);


//  desscrob the api  behaviour

describe('User Api',()=>{
    it('GET api/users empty array',async()=>{
        const res=await request(app).get('/api/users');
        expect(res.status).toBe(200);
        expect(res.body).toBeArray()
    })


    //  this test case for

    it('POST /api/users valid user ALSO',async()=>{

const res=await request(app)
.post('/api/users')
.send({
    name:'Rahul',
    email:'rahul@gmail.com',
    password:"rahul123"
})
   expect(res.status).toBe(201);
        expect(res.body.name).toBe('Rahul');
        expect(res.body.email).toBe('rahul@gmail.com');


    })



// post  bu incvalid 

it('POST /api/users — name too short → 400', async () => {
        const res = await request(app)
            .post('/api/users')
            .send({
                name: 'R',
                email: 'rahul@gmail.com',
                password: 'rahul123'
            });
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Name min 2 chars');
    });



    //  for invalid email
    it('POST /api/users — invalid email → 400', async () => {
        const res = await request(app)
            .post('/api/users')
            .send({
                name: 'Rahul',
                email: 'notanemail',
                password: 'rahul123'
            });
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Valid email required');
    });

}














)
