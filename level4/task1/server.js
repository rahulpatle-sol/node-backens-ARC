//  listening the server 


import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config();
connectDB();
import express from "express";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});