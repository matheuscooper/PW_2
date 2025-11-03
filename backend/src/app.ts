import express from "express";
import { clientsRoutes } from "./routes/clients.routes";
import { productsRoutes } from "./routes/products.routes";
import { categoryRoutes } from "./routes/category.routes";

const app = express();

app.use(express.json());

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

app.use("/api", clientsRoutes);
app.use("/api", productsRoutes);
app.use("/api", categoryRoutes);

export default app;
