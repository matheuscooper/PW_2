import { Request, Response } from "express";
import { LoadEnv } from "../../../config/env";
import { CreatePurchaseUseCase } from "./createPurchase.useCase";

export class CreatePurchaseController {
  constructor(
    private readonly loadEnvs: LoadEnv,
    private readonly createPurchaseUseCase: CreatePurchaseUseCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const envs = await this.loadEnvs();
      const payload = req.body;

      const result = await this.createPurchaseUseCase.execute(envs, {
        userId: req.session.userId!,
        items: payload.items,
      });

      return res.status(201).json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}
