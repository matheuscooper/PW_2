import express from "express";
import cors from "cors";
import session from "express-session";
import { userRoutes } from "./routes/clients.routes";
import { productsRoutes } from "./routes/products.routes";
import { categoryRoutes } from "./routes/category.routes";
import purchaseRouter from "./routes/purchase.routes";
import FileStore from "session-file-store";

const app = express();

const FileStoreSession = FileStore(session);

app.use(
  session({
    store: new FileStoreSession({
      path: "./sessions",
      retries: 1,
    }),
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    },
  })
);

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000", // URL do frontend
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.get("/api/auth/me", (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Não autenticado" });
  }

  return res.json({
    userId: req.session.userId,
    userType: req.session.userType,
  });
});

app.use("/api", userRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/purchases", purchaseRouter);

export default app;
