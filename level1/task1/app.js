import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({ message: "Server is running" });
});

app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", uptime: process.uptime() });
});

app.post("/echo", (req, res) => {
    res.status(200).json(req.body);
});

export default app;