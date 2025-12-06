import { EnvType } from "../../../config/env";
import { IProductsRepository } from "../../../repositories/IProducts.repository";

export class ListProductsCardUseCase {
  constructor(private productsRepository: IProductsRepository) {}

  async execute(envs: EnvType) {
    const products = await this.productsRepository.listProductCard(envs);

    return products;
  }
}
