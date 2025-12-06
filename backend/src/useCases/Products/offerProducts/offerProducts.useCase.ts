import { Request, Response } from "express";
import { OfferProductsUseCase } from "./offerProducts.controller";
import { LoadEnv } from "../../../config/env";

export class OfferProductsController {
  constructor(
    private readonly loadEnvs: LoadEnv,
    private readonly offerProductsUseCase: OfferProductsUseCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const envs = await this.loadEnvs();
      const limit = Number(req.query.limit) || 5;

      const offers = await this.offerProductsUseCase.execute(envs, limit);

      return res.json({ offers });
    } catch (error: any) {
      console.error(error);
      return res.status(400).json({ error: error.message });
    }
  }
}
