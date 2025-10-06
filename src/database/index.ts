import type { EnvType } from "../config/env";
import { drizzle } from "drizzle-orm/singlestore/driver";
import { clientSchema } from "./schemas/client.schema";

export const db = async (envs: EnvType) => {
  return drizzle(envs.DATABASE_URL, {
    schema: {
      clientSchema,
    },
  });
};
