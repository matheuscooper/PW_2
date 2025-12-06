import { Request, Response, NextFunction } from "express";

export function ensureAdmin(req: Request, res: Response, next: NextFunction) {
  console.log("SESSION?:", req.session);
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ error: "Usuário não autenticado" });
  }

  if (req.session.userType !== "admin") {
    return res.status(403).json({ error: "Acesso permitido apenas para administradores" });
  }

  return next();
}
