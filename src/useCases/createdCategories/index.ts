import { loadEnvs } from "../../config/env";
import { CategoriesRepository } from "../../repositories/implementations/cateorie.drizzle.repository";
import { CreateCategoryController } from "./createCategories.controller";
import { CreateCategoryUseCase } from "./createCategories.useCase";

export const createCategoryControllerFactory = new CreateCategoryController(
  loadEnvs,
  new CreateCategoryUseCase(new CategoriesRepository())
);
