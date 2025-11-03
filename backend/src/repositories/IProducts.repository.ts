import { EnvType } from "../config/env";
import { Product, ProductProps } from "../entities/product";

export type ListProductsParams = {
  page?: number;
  perPage?: number;
  categoriaId?: string;
  search?: string;
  orderBy?: "nome" | "preco";
  order?: "asc" | "desc";
};

export type ListProductsResult = {
  items: Product[];
  total: number;
  page: number;
  perPage: number;
};

export type ProductPatch = Partial<Pick<ProductProps, "nome" | "descricao" | "preco" | "estoque" | "categoriaId">>;

export interface IProductsRepository {
  save(envs: EnvType, product: Product): Promise<void>;
  update(envs: EnvType, id: string, product: Product): Promise<void>;
  updatePartial(envs: EnvType, id: string, patch: ProductPatch): Promise<void>;
  deleteById(envs: EnvType, id: string): Promise<void>;
  findById(envs: EnvType, id: string): Promise<Product | null>;
  findByNome(envs: EnvType, nome: string): Promise<Product | null>;
  list(envs: EnvType, params?: ListProductsParams): Promise<ListProductsResult>;
}
