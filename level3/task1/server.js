import 'dotenv/config';
import app from './app.js';
import connectDB from './db/index.js';

const PORT = process.env.PORT || 3000;

await connectDB(); // ← ye missing tha
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});