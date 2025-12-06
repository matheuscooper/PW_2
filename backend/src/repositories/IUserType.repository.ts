import { UserType } from "../entities/userType";
import { EnvType } from "../config/env";

export interface IUserTypeRepository {
  findByName(envs: EnvType, name: string): Promise<UserType | null>;
  findById(envs: EnvType, id: string): Promise<UserType | null>;
}
