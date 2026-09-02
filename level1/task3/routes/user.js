

import express from "express";
const router=express.Router()

const users=[];

// user nahi mila
router.get('/users/:id', (req, res, next) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        const err = new Error("User not found");
        err.status = 404;
        return next(err);  // ← errorHandler ko bhejo
    }
    res.status(200).json(user);
});


router.get('/users', (req, res) => {
    res.status(200).json(users);
});
// name missing
router.post('/users', (req, res, next) => {
    const { name, email } = req.body;
    if (!name) {
        const err = new Error("Name is required");
        err.status = 400;
        return next(err);
    }
    const newUser = { id: Date.now(), name, email };
    users.push(newUser);
    res.status(201).json(newUser);
});

// intentional crash
router.get('/crash', (req, res, next) => {
    const err = new Error("Something crashed!");
    err.status = 500;
    next(err);
});
export default router;
