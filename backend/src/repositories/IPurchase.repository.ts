import { Purchase } from "../entities/purchase";
import { EnvType } from "../config/env";

export interface IPurchaseRepository {
  save(envs: EnvType, purchase: Purchase): Promise<string>;
  findByUser(envs: EnvType, userId: string): Promise<Purchase[]>;
  findById(envs: EnvType, id: string): Promise<Purchase | null>;
}
