// POST /api/auth/register → user banao, password hash karo
// POST /api/auth/login    → credentials verify karo, JWT do
import bcrypt from 'bcrypt'; // ✅
import express, { Router } from 'express';

import jwt from 'jsonwebtoken'


const router = express.Router();

const users = [];

//  post
router.post('/register', async (req, res, next) => {

  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      const err = new Error("name, email and password are required");
      err.status = 400;
      return next(err);
    }

    const exists = users.find(u => u.email === email);
    if (exists) {
      const err = new Error("Email already registered");
      err.status = 400;
      return next(err);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = { id: Date.now(), name, email, password: hashedPassword };
    users.push(user);

    //  token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({ token });

  } catch (err) {
    next(err);
  }
});


router.post('/login', async (req, res, next) => {

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const err = new Error("email and password are required");
      err.status = 400;
      return next(err);
    }

    const user = users.find(u => u.email === email);
    if (!user) {
      const err = new Error("Invalid credentials");
      err.status = 401;
      return next(err);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const err = new Error("Invalid credentials");
      err.status = 401;
      return next(err);
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({ token });

  } catch (err) {
    next(err);
  }
});

export default router;
