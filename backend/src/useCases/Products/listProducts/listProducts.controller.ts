import { Request, Response } from "express";
import { LoadEnv } from "../../../config/env";
import { ListProductsUseCase } from "./listProducts.useCase";

export class ListProductsController {
  constructor(
    private readonly loadEnvs: LoadEnv,
    private readonly listProductsUseCase: ListProductsUseCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const envs = await this.loadEnvs();

      const result = await this.listProductsUseCase.execute(envs);

      return res.json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao listar produtos" });
    }
  }
}
