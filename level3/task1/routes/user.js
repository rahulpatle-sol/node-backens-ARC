
import express from 'express';
import User from '../models/users.js';



const router = express.Router();

// Create a new user
router.post('/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;