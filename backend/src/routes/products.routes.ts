import { Router } from "express";
import { CreatedProductController } from "../useCases/createdProducts/createdProduct.controller";
import { createProductControllerFactory } from "../useCases/createdProducts";

export const productsRoutes = Router();

productsRoutes.post("/products", (req, res) => {
  return createProductControllerFactory.handle(req, res);
});
