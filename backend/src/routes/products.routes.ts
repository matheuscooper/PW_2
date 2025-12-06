import { Router } from "express";
import { createProductControllerFactory } from "../useCases/Products/createdProducts";
import { listProductsControllerFactory } from "../useCases/Products/listProducts";
import { listProductsCardControllerFactory } from "../useCases/Products/listProductsCard";
import { detailsProductControllerFactory } from "../useCases/Products/detailsProducts";
import { deleteControllerFactory } from "../useCases/Products/deleteProduct";
import { updateProductControllerFactory } from "../useCases/Products/updateProduct";
import { ensureAdmin } from "../middleware/ensureAdmin";
import { isAdmin } from "../middleware/isAdmin";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { offerProductsControllerFactory } from "../useCases/Products/offerProducts";

export const productsRoutes = Router();

productsRoutes.post("/create", ensureAdmin, (req, res) => {
  return createProductControllerFactory.handle(req, res);
});

productsRoutes.get("/list", isAdmin, (req, res) => {
  return listProductsControllerFactory.handle(req, res);
});

productsRoutes.get("/list-cards", (req, res) => {
  return listProductsCardControllerFactory.handle(req, res);
});

productsRoutes.get("/:id", (req, res) => {
  return detailsProductControllerFactory.handle(req, res);
});

productsRoutes.delete("/:id", isAuthenticated, (req, res) => {
  return deleteControllerFactory.handle(req, res);
});

productsRoutes.put("/:id", ensureAdmin, (req, res) => {
  return updateProductControllerFactory.handle(req, res);
});

productsRoutes.get("/offers/list", (req, res) => {
  return offerProductsControllerFactory.handle(req, res);
});
