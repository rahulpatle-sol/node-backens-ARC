import express, { Router } from "express";
import userSchema from '../validators/userSchema.js'
const router=express.Router();


//  jsut simple a single psot


const  users=[];




router.post('/users', (req, res, next) => {
    
    // step 1 — validate
    const result = userSchema.safeParse(req.body);
    
    // step 2 — fail hua?
    // if (!result.success) {
    //     const err = new Error(result.error.errors[0].message);
    //     err.status = 400;
    //     return next(err);
    // }
    
if (!result.success) {
    const err = new Error(result.error.issues[0].message); // ← 'errors' nahi, 'issues' hai v4 mein
    err.status = 400;
    return next(err);
}
    // step 3 — sahi data use karo
    const { name, email } = result.data;
    const newUser = { id: Date.now(), name, email };
    users.push(newUser);
    res.status(201).json(newUser);
});


export default router;
