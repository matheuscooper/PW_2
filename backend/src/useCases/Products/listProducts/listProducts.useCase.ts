import { EnvType } from "../../../config/env";
import { IProductsRepository } from "../../../repositories/IProducts.repository";

export class ListProductsUseCase {
  constructor(private productsRepository: IProductsRepository) {}

  async execute(envs: EnvType) {
    const products = await this.productsRepository.listProduct(envs);

    return products;
  }
}
