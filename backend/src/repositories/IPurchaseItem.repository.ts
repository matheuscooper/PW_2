import { EnvType } from "../config/env";
import { PurchaseItem } from "../entities/purchaseItem";

export interface IPurchaseItemRepository {
  save(envs: EnvType, purchase: PurchaseItem): Promise<void>;
  findById(envs: EnvType, id: string): Promise<PurchaseItem | null>;
  findByPurchase(envs: EnvType, userId: string): Promise<PurchaseItem[]>;
}
