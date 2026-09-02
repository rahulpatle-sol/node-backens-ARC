//  makingh a router for user related routes


// the crud app  but using the array 
// GET    /api/users         → sab users
// GET    /api/users/:id     → ek user by id
// POST   /api/users         → naya user banao
// PUT    /api/users/:id     → user update karo
// DELETE /api/users/:id     → user delete karo
// app.js mein sirf app.use('/api', usersRouter) — routes wahan nahi
// User object: { id, name, email }
// id ke liye Date.now() use karo


import express from "express";


const  router = express.Router();

// in-memory array to store users
let users = [];


//  creating the first methiod or route to  al  users dtaa

router.get('/users', (req, res) => {
    res.status(200).json(users);
});

//  creating the second method or route to get a single user by id
router.get('/users/:id', (req, res) => {
    const user = users.find(u=>u.id===parseInt(req.params.id));

    if (!user)return res.status(404).json({message:"User Not Found"});
    res.status(200).json(user);

});


//  post method to create a new user
router.post('/users', (req, res) => {
    const { name, email } = req.body;
    const newUser={
        id: Date.now(),
        name,
        email ,
    };
    users.push(newUser);
    res.status(201).json(newUser);
}     
    );

    //  put method to update a user by id

    router.put('/users/:id',(req,res)=>{
const index=users.findIndex(u=> u.id ===parseInt(req.params.id));
if (index=== -1) return res.status(404).json({message:`user not found`})
users[index]={...users[index],...req.body};
res.status(200).json(users[index])

    })

    //  delete the user 
    router.delete('/users/:id',async (req,res)=>{
       const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: "User not found" })
       users.splice(index,1) ;
    res.status(200).json({message:"user deleted "})
    })
    //  let code the 404 page  

 
    export default router;
    
