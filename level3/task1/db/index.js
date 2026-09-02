import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        console.log('URI:', uri); // debug ke liye
        await mongoose.connect(uri);
        console.log('MongoDB connected!');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1);
    }
};

export default connectDB;