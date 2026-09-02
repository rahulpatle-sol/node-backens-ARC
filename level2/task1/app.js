import express from 'express';

import authRoutes from './auth/routes/auth.js';
import paymentRoutes from './payment/routes/payment.js';
import errorHandler from './auth/middlewares/errorHandler.js';

const app = express();

app.use(express.json());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentRoutes); // protected

// global error handler — hamesha routes ke BAAD
app.use(errorHandler);

export default app;
