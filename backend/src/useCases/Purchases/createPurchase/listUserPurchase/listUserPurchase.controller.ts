import { Request, Response } from "express";
import { LoadEnv } from "../../../../config/env";
import { ListUserPurchasesUseCase } from "./listUserPurchase.useCase";

export class ListUserPurchasesController {
  constructor(
    private readonly loadEnvs: LoadEnv,
    private readonly listPurchasesUseCase: ListUserPurchasesUseCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const envs = await this.loadEnvs();

      if (!req.session.userId) {
        return res.status(401).json({ error: "Usuário não autenticado." });
      }

      const result = await this.listPurchasesUseCase.execute(envs, req.session.userId);

      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}
