import { loadEnvs } from "../../config/env";
import { CategoriesRepository } from "../../repositories/implementations/cateorie.drizzle.repository";
import { ProductsRepository } from "../../repositories/implementations/product.drizzle.repository";
import { CreatedProductController } from "./createdProduct.controller";
import { CreateProductUseCase } from "./createdProduct.useCase";

export const createProductControllerFactory = new CreatedProductController(
  loadEnvs,
  new CreateProductUseCase(new ProductsRepository(), new CategoriesRepository())
);
