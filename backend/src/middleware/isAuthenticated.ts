import { Request, Response, NextFunction } from "express";

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  console.log("🔥 SESSION RECEBIDA NO BACKEND:", req.session);

  if (!req.session.userId) {
    console.log("❌ SEM USERID → 401");
    return res.status(401).json({ error: "Usuário não autenticado" });
  }

  console.log("✅ USERID OK:", req.session.userId);
  next();
}
