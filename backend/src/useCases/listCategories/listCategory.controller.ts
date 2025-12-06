import { Request, Response } from "express";
import { LoadEnv } from "../../config/env";
import { ListCategoryUseCase } from "./listCategory.useCase";

export class ListCategoryController {
  constructor(
    private readonly loadEnvs: LoadEnv,
    private readonly listCategoryUseCase: ListCategoryUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<any> {
    try {
      const envs = await this.loadEnvs();
      const { result } = await this.listCategoryUseCase.execute(envs);

      return res.status(200).json({
        result,
      });
    } catch (err) {
      console.error(err);

      return res.status(500).json({
        message: "Erro ao listar categorias",
      });
    }
  }
}
