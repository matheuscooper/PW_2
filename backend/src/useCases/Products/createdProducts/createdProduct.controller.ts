import { Request, Response } from "express";
import { LoadEnv } from "../../../config/env";
import { CreateProductUseCase } from "./createdProduct.useCase";

export class CreatedProductController {
  constructor(
    private readonly loadEnvs: LoadEnv,
    private readonly createdProductUseCase: CreateProductUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<any> {
    try {
      const envs = await this.loadEnvs();
      const payload = req.body;

      const resultProduct = await this.createdProductUseCase.execute(envs, payload);

      const { product } = resultProduct;

      res.status(201).json({
        nome: product.nome,
        preco: product.preco,
        descricao: product.descricao,
        estoque: product.estoque,
        categoria: product.categoriaId,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
