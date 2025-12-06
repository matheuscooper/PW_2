import { EnvType } from "../../../config/env";
import { IProductsRepository } from "../../../repositories/IProducts.repository";

export class DeleteUseCase {
  constructor(private readonly deleteProduct: IProductsRepository) {}

  async execute(envs: EnvType, productId: string) {
    console.log("ID do produto removido:", productId);
    const productDeleted = await this.deleteProduct.softDelete(envs, productId);
    console.log("Produto removido", productDeleted);
  }
}
