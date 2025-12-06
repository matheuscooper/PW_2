import { EnvType } from "../../../../config/env";
import { IPurchaseRepository } from "../../../../repositories/IPurchase.repository";
import { IPurchaseItemRepository } from "../../../../repositories/IPurchaseItem.repository";
import { IProductsRepository } from "../../../../repositories/IProducts.repository";

export class ListUserPurchasesUseCase {
  constructor(
    private readonly purchaseRepository: IPurchaseRepository,
    private readonly purchaseItemRepository: IPurchaseItemRepository,
    private readonly productsRepository: IProductsRepository
  ) {}

  async execute(envs: EnvType, userId: string) {
    const purchases = await this.purchaseRepository.findByUser(envs, userId);

    const result = [];

    for (const purchase of purchases) {
      const items = await this.purchaseItemRepository.findByPurchase(envs, purchase.props.id!);

      const detailedItems = [];

      for (const item of items) {
        const product = await this.productsRepository.findById(envs, item.props.productId!);

        detailedItems.push({
          productId: item.props.productId,
          nome: product?.props.nome,
          quantidade: item.props.quantidade,
          precoUnitario: Number(item.props.precoUnitario),
          subtotal: Number(item.props.precoUnitario) * item.props.quantidade,
        });
      }

      result.push({
        purchaseId: purchase.props.id,
        total: purchase.props.total,
        createdAt: purchase.props.createdAt,
        items: detailedItems,
      });
    }

    return result;
  }
}
