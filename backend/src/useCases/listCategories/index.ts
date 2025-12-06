import { loadEnvs } from "../../config/env";
import { CategoriesRepository } from "../../repositories/implementations/cateorie.drizzle.repository";
import { ListCategoryController } from "./listCategory.controller";
import { ListCategoryUseCase } from "./listCategory.useCase";

export const listCategoriesControllerFactory = new ListCategoryController(
  loadEnvs,
  new ListCategoryUseCase(new CategoriesRepository())
);
