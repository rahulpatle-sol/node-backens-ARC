// app
import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import router from './routes/user.js';
import postRouter from './routes/post.js';
const app = express();  


app.use(cors());


app.use(express.json());
app.use('/api', router);
app.use('/api', postRouter);

export default app;
