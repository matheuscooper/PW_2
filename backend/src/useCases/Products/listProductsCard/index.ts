import { loadEnvs } from "../../../config/env";
import { ProductsRepository } from "../../../repositories/implementations/product.drizzle.repository";
import { ListProductsCardController } from "./listProductsCard.controller";
import { ListProductsCardUseCase } from "./listProductsCard.useCase";

export const listProductsCardControllerFactory = new ListProductsCardController(
  loadEnvs,
  new ListProductsCardUseCase(new ProductsRepository())
);
