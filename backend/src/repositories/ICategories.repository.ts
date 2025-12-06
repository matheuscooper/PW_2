import { EnvType } from "../config/env";
import { Category } from "../entities/cateories";

export interface ICategoriesRepository {
  save(envs: EnvType, category: Category): Promise<void | null>;
  findByName(envs: EnvType, nome: string): Promise<{ id: string; nome: string } | null>;
  list(envs: EnvType): Promise<Category[]>;
  findById(envs: EnvType, id: string): Promise<Category | null>;
}
