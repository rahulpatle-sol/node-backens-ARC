import express from 'express'

import router from './routes/user.js';
const app=express();
app.use(express.json());

import errorhandler from './middleware/errorhandler.js'
app.use('/api',router);
app.use(errorhandler);


export default app;
