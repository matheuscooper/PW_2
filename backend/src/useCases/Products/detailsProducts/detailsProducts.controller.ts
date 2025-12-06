import { Request, Response } from "express";
import { LoadEnv } from "../../../config/env";
import { DetailsProductsUseCase } from "./detailsProducts.useCase";
import { prototypejs } from "globals";

export class DetailsProductsController {
  constructor(
    private readonly loadEnvs: LoadEnv,
    private readonly detailsProductsUseCase: DetailsProductsUseCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const envs = await this.loadEnvs();

      const idProduct = req.params.id;

      const result = await this.detailsProductsUseCase.execute(envs, idProduct);

      return res.json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao exibir detalhes do produto" });
    }
  }
}
