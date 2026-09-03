//  auth flow for the routes

import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

const  router = express.Router();


const  generateToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    });
}


//  register user
router.post('/register', async (req, res) => {
    console.log('JWT_SECRET:', process.env.JWT_SECRET);
    console.log('Body:', req.body);
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({ name, email, password });
        await user.save();
        const token = generateToken(user);
        res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        console.error('REGISTER ERROR:', error); // ← ye add karo
        res.status(500).json({ message: 'Server error' });
    }
});



//  debug 

//  login user


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = generateToken(user);
        res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});


export default router;