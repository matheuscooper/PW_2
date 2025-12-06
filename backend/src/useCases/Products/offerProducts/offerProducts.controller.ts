import { EnvType } from "../../../config/env";
import { IProductsRepository } from "../../../repositories/IProducts.repository";

export class OfferProductsUseCase {
  constructor(private readonly productsRepo: IProductsRepository) {}

  async execute(envs: EnvType, limit: number = 5) {
    // Buscar produtos mais caros
    const mostExpensive = await this.productsRepo.findMostExpensive(envs, limit);

    // Aplicar desconto de 10%
    const discounted = mostExpensive.map((product) => {
      const originalPrice = parseFloat(product.preco);
      const finalPrice = (originalPrice * 0.9).toFixed(2); // 10% OFF

      return {
        ...product,
        originalPrice: originalPrice.toFixed(2),
        discountedPrice: finalPrice,
        discount: "10%",
      };
    });

    return discounted;
  }
}
