import type { EnvType } from "../config/env";
import type { User } from "../entities/user";
import { UpdateUserPayload } from "../useCases/updateUser/updaterUser.useCase";

export type UpdateUser = {
  nome?: string;
  email?: string;
  senha?: string;
};

export interface IUsersRepository {
  save(envs: EnvType, User: User): Promise<void>;
  findByCPF(envs: EnvType, cpf: string): Promise<User | null>;
  findByEmail(envs: EnvType, email: string): Promise<User | null>;
  findById(envs: EnvType, id: string): Promise<User | null>;
  update(envs: EnvType, id: string, updatePayload: UpdateUser): Promise<void>;
}
