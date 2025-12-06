import { Request, Response } from "express";
import { LoadEnv } from "../../../config/env";
import { UpdateProductUseCase } from "./update.useCase";

export class UpdateProductController {
  constructor(
    private readonly loadEnvs: LoadEnv,
    private readonly updateProductUseCase: UpdateProductUseCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const envs = await this.loadEnvs();
      const id = req.params.id;
      const payload = req.body;

      const updated = await this.updateProductUseCase.execute(envs, id, payload);

      return res.status(200).json(updated);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
