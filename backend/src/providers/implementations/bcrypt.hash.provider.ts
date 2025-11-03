import { env } from "process";
import { LoadEnv, loadEnvs } from "../../config/env";
import { IHashProvider } from "../IHash.provider";
import bcrypt from "bcrypt";

export class BcryptHashProvider implements IHashProvider {
  constructor(private readonly loadEnvs: LoadEnv) {}

  async hash(value: string): Promise<string> {
    const envs = await this.loadEnvs();
    return bcrypt.hash(value, envs.BCRYPT_SALT_ROUNDS);
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }
}
