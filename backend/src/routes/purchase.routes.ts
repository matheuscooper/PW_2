import { Router } from "express";
import { createPurchaseControllerFactory } from "../useCases/Purchases/createPurchase";
import { listUserPurchasesControllerFactory } from "../useCases/Purchases/createPurchase/listUserPurchase";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { ensureAdmin } from "../middleware/ensureAdmin";

const purchaseRouter = Router();

purchaseRouter.post("/sales", isAuthenticated, (req, res) => {
  return createPurchaseControllerFactory.handle(req, res);
});

purchaseRouter.get("/history/:userId", isAuthenticated, (req, res) => {
  return listUserPurchasesControllerFactory.handle(req, res);
});

export default purchaseRouter;
