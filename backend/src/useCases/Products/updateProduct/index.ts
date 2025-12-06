import { loadEnvs } from "../../../config/env";
import { ProductsRepository } from "../../../repositories/implementations/product.drizzle.repository";
import { UpdateProductController } from "./update.controller";
import { UpdateProductUseCase } from "./update.useCase";

export const updateProductControllerFactory = new UpdateProductController(
  loadEnvs,
  new UpdateProductUseCase(new ProductsRepository())
);
