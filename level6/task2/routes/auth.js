
//  creting routes for the 


import express from 'express'

import emailQueue from "../queue.js"

const router=express.Router();


router.post('/register',async (req,res,next)=>{

    try{
        const {name ,email,password}=req.body;
        console.log(`user registered :${email}`);

    
    await emailQueue.add('welcome-email',{
        to:email,
        subject:'welcome brother',
        body:`hello  ${name}, thank  you  for visiting`
    },{
        attempts:3,
        backoff:{
            type:'fixed',
            delay:2000
        }
    })
 res.status(201).json({
    message:"user registerde",
    user:{name,email}
 })

}
catch(err){
    next(err)
}
})


export default router;

