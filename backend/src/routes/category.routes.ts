import { Router } from "express";
import { createCategoryControllerFactory } from "../useCases/createdCategories";

export const categoryRoutes = Router();

categoryRoutes.post("/categorie", (req, res) => {
  return createCategoryControllerFactory.handle(req, res);
});
