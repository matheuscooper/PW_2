import { Router } from "express";
import { createCategoryControllerFactory } from "../useCases/createdCategories";
import { listCategoriesControllerFactory } from "../useCases/listCategories";

export const categoryRoutes = Router();

categoryRoutes.post("/create", (req, res) => {
  return createCategoryControllerFactory.handle(req, res);
});

categoryRoutes.get("/list", (req, res) => {
  return listCategoriesControllerFactory.handle(req, res);
});
