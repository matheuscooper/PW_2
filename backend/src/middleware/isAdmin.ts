import { Request, Response, NextFunction } from "express";

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.session.userType !== "admin") {
    return res.status(403).json({ error: "Acesso negado: apenas admins" });
  }
  next();
}
