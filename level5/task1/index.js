import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';
import connectDB from './db/mongo.js';

const PORT = process.env.PORT || 3000;

await connectDB();
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});