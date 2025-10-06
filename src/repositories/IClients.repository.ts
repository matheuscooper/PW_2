import type { EnvType } from "../config/env";
import type { Client } from "../entities/client";

export interface IClientsRepository {
  save(envs: EnvType, client: Client): Promise<void>;
  findByCPF(envs: EnvType, cpf: string): Promise<Client | null>;
  findByEmail(envs: EnvType, email: string): Promise<Client | null>;
  findById(envs: EnvType, id: string): Promise<Client | null>;
}
