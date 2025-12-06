// src/useCases/Users/updateUser/updateUser.controller.ts
import { Request, Response } from "express";
import { LoadEnv } from "../../config/env";
import { UpdateUserUseCase } from "./updaterUser.useCase";

export class UpdateUserController {
  constructor(
    private readonly loadEnv: LoadEnv,
    private readonly updateUserUseCase: UpdateUserUseCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const envs = await this.loadEnv();
      const userId = req.session.userId;

      if (!userId) {
        return res.status(401).json({ error: "Usuário não autenticado." });
      }

      const updated = await this.updateUserUseCase.execute(envs, userId, req.body);

      return res.json({
        message: "Usuário atualizado com sucesso.",
        user: updated,
      });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}
