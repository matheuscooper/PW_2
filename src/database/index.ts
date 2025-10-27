import type { EnvType } from "../config/env";
import { drizzle } from "drizzle-orm/node-postgres";
import { clientSchema } from "./schemas/client.schema";
import { productSchema } from "./schemas/product.schema";
import { categorySchema } from "./schemas/category.schema";

export const db = async (envs: EnvType) => {
  return drizzle(envs.DATABASE_URL, {
    schema: {
      clientSchema,
      productSchema,
      categorySchema,
    },
  });
};
