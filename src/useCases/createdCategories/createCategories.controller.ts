import { Request, Response } from "express";
import { LoadEnv } from "../../config/env";
import { CreateCategoryUseCase } from "./createCategories.useCase";

export class CreateCategoryController {
  constructor(
    private readonly loadEnvs: LoadEnv,
    private readonly createdCategoryUseCase: CreateCategoryUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<any> {
    try {
      const envs = await this.loadEnvs();
      const payload = req.body;

      const resultCategory = await this.createdCategoryUseCase.execute(envs, payload);

      const { category } = resultCategory;

      res.status(201).json({
        message: "Categoria adicionada com sucesso",
        category: {
          nome: category.nome,
          descricao: category.descricao,
        },
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
