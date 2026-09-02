import express, { Router } from 'express';

import protect from '../../auth/middlewares/protect.js';

const router = Router();

// POST /api/payments → protected route (sirf logged in user hi pay kar sakta hai)
router.post('/', protect, (req, res, next) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      const err = new Error('Valid amount required');
      err.status = 400;
      return next(err);
    }

    // req.user me decoded JWT payload hai {id, email}
    res.status(200).json({
      success: true,
      message: `Payment of ${amount} done by ${req.user.email}`,
      data: { userId: req.user.id, amount },
    });
  } catch (err) {
    next(err);
  }
});

export default router;
