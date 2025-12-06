import { EnvType } from "../../../config/env";
import { IProductsRepository, ProductPatch } from "../../../repositories/IProducts.repository";

export type UpdateProductPayload = {
  nome?: string;
  descricao?: string;
  preco?: string;
  estoque?: number;
  categoriaId?: string;
};

export class UpdateProductUseCase {
  constructor(private readonly updateProducts: IProductsRepository) {}

  async execute(envs: EnvType, id: string, payload: UpdateProductPayload) {
    const productUpdated = await this.updateProducts.findById(envs, id);

    const updatedProps = {
      ...productUpdated,
      ...payload,
    };

    await this.updateProducts.updatePartial(envs, id, updatedProps);

    return updatedProps;
  }
}
