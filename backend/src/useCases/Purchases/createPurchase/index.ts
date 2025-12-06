import { CreatePurchaseUseCase } from "./createPurchase.useCase";
import { CreatePurchaseController } from "./createPurchase.controller";

import { PurchaseRepository } from "../../../repositories/implementations/purchase.drizzle.repository";
import { PurchaseItemRepository } from "../../../repositories/implementations/purchaseItem.drizzle.repository";
import { ProductsRepository } from "../../../repositories/implementations/product.drizzle.repository";

import { LoadEnv, loadEnvs } from "../../../config/env";

export const createPurchaseControllerFactory = new CreatePurchaseController(
  loadEnvs,
  new CreatePurchaseUseCase(new PurchaseRepository(), new PurchaseItemRepository(), new ProductsRepository())
);
