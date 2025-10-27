import express from "express";
import { clientsRoutes } from "./routes/clients.routes";

const app = express();

app.use(express.json());

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

app.use("/api", clientsRoutes);

export default app;
