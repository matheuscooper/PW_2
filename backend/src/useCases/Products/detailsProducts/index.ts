import { loadEnvs } from "../../../config/env";
import { CategoriesRepository } from "../../../repositories/implementations/cateorie.drizzle.repository";
import { ProductsRepository } from "../../../repositories/implementations/product.drizzle.repository";
import { DetailsProductsController } from "./detailsProducts.controller";
import { DetailsProductsUseCase } from "./detailsProducts.useCase";

export const detailsProductControllerFactory = new DetailsProductsController(
  loadEnvs,
  new DetailsProductsUseCase(new ProductsRepository(), new CategoriesRepository())
);
