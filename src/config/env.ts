import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.string().min(1),
  DATABASE_URL: z.string().min(1),
});

type EnvType = z.infer<typeof envSchema>;
type LoadEnv = () => Promise<EnvType>;

const loadEnvs = async (): Promise<EnvType> => {
  return envSchema.parse(process.env);
};

export { loadEnvs, type EnvType, type LoadEnv };
