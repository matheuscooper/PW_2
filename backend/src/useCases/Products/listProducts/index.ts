import { loadEnvs } from "../../../config/env";
import { ProductsRepository } from "../../../repositories/implementations/product.drizzle.repository";
import { ListProductsController } from "./listProducts.controller";
import { ListProductsUseCase } from "./listProducts.useCase";

export const listProductsControllerFactory = new ListProductsController(
  loadEnvs,
  new ListProductsUseCase(new ProductsRepository())
);
