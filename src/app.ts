import express from "express";

const app = express();

app.use(express.json());

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

export default app;
