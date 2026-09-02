import express from 'express'
import errorhandler from './middleware/errorHandler.js';
import router from './routes/user.js';
const app=express();
app.use(express.json());


app.use('/api',router);
app.use(errorhandler);


export default app;
