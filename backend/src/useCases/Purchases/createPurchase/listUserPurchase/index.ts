import { loadEnvs } from "../../../../config/env";
import { ProductsRepository } from "../../../../repositories/implementations/product.drizzle.repository";
import { PurchaseRepository } from "../../../../repositories/implementations/purchase.drizzle.repository";
import { PurchaseItemRepository } from "../../../../repositories/implementations/purchaseItem.drizzle.repository";
import { ListUserPurchasesController } from "./listUserPurchase.controller";
import { ListUserPurchasesUseCase } from "./listUserPurchase.useCase";

export const listUserPurchasesControllerFactory = new ListUserPurchasesController(
  loadEnvs,
  new ListUserPurchasesUseCase(new PurchaseRepository(), new PurchaseItemRepository(), new ProductsRepository())
);
