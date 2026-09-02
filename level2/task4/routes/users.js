import express from 'express';
import pool from '../db/index.js';

const router = express.Router();

// GET all users
router.get('/users', async (req, res, next) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.status(200).json(result.rows);
    } catch (err) {
        next(err);
    }
});

// GET user by id
router.get('/users/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            'SELECT * FROM users WHERE id = $1', [id]
        );
        if (result.rows.length === 0) {
            const err = new Error('User not found');
            err.status = 404;
            return next(err);
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        next(err);
    }
});

// POST create user
router.post('/users', async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const result = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
            [name, email, password]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        next(err);
    }
});

// PUT update user
router.put('/users/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        const result = await pool.query(
            'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
            [name, email, id]
        );
        if (result.rows.length === 0) {
            const err = new Error('User not found');
            err.status = 404;
            return next(err);
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        next(err);
    }
});

// DELETE user
router.delete('/users/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            'DELETE FROM users WHERE id = $1 RETURNING *', [id]
        );
        if (result.rows.length === 0) {
            const err = new Error('User not found');
            err.status = 404;
            return next(err);
        }
        res.status(200).json({ message: 'User deleted' });
    } catch (err) {
        next(err);
    }
});

export default router;