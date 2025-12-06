import type { EnvType } from "../config/env";
import { drizzle } from "drizzle-orm/node-postgres";
import { userSchema } from "./schemas/user.schema";
import { productSchema } from "./schemas/product.schema";
import { categorySchema } from "./schemas/category.schema";
import { purchaseSchema } from "./schemas/purchase.schema";
import { userTypeSchema } from "./schemas/userTypes.schema";
import { purchaseItemSchema } from "./schemas/purchasesItems.schema";

export const db = async (envs: EnvType) => {
  return drizzle(envs.DATABASE_URL, {
    schema: {
      userSchema,
      userTypeSchema,
      productSchema,
      categorySchema,
      purchaseSchema,
      purchaseItemSchema,
    },
  });
};
