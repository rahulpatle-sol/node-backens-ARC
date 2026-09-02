

import express from 'express';
import router from './routes/users.js';

const app = express();

app.use(express.json());

// routes
app.use('/api',router);


export default app;
