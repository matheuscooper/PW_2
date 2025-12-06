import { EnvType } from "../../../config/env";
import { IProductsRepository } from "../../../repositories/IProducts.repository";

export class DeleteUseCase {
  constructor(private readonly deleteProduct: IProductsRepository) {}

  async execute(envs: EnvType, productId: string) {
    const productDeleted = await this.deleteProduct.deleteById(envs, productId);
  }
}
