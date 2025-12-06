import { Router, Request, Response } from "express";
import { createUserControllerFactory } from "../useCases/createdUser";
import { loginControllerFactory } from "../useCases/loginClients";
import { UsersRepository } from "../repositories/implementations/user.drizzle.repository";
import { updateUserControllerFactory } from "../useCases/updateUser";
import { EnvType } from "../config/env";

export const userRoutes = Router();

userRoutes.post("/auth/register", (req: Request, res: Response) => {
  return createUserControllerFactory.handle(req, res);
});

userRoutes.post("/auth/login", (req, res) => {
  return loginControllerFactory.handle(req, res);
});

userRoutes.put("/auth/update", (req: Request, res: Response) => {
  return updateUserControllerFactory.handle(req, res);
});
