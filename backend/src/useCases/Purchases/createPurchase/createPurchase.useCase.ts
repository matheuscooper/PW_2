import { EnvType } from "../../../config/env";
import { IPurchaseRepository } from "../../../repositories/IPurchase.repository";
import { IPurchaseItemRepository } from "../../../repositories/IPurchaseItem.repository";
import { IProductsRepository } from "../../../repositories/IProducts.repository";
import { Purchase } from "../../../entities/purchase";
import { PurchaseItem } from "../../../entities/purchaseItem";

type CreatePurchasePayload = {
  userId: string;
  items: Array<{
    productId: string;
    quantidade: number;
  }>;
};

export class CreatePurchaseUseCase {
  constructor(
    private readonly purchaseRepository: IPurchaseRepository,
    private readonly purchaseItemRepository: IPurchaseItemRepository,
    private readonly productsRepository: IProductsRepository
  ) {}

  async execute(envs: EnvType, payload: CreatePurchasePayload) {
    const { userId, items } = payload;

    if (!userId) throw new Error("userId inválido.");
    if (!items.length) throw new Error("Carrinho vazio.");

    let total = 0;

    const produtosValidos: any[] = [];

    // Validar produtos + checar estoque
    for (const item of items) {
      const product = await this.productsRepository.findById(envs, item.productId);

      if (!product) {
        throw new Error(`Produto ${item.productId} não encontrado`);
      }

      if (product.props.estoque < item.quantidade) {
        throw new Error(`Estoque insuficiente para ${product.props.nome}`);
      }

      produtosValidos.push(product);

      total += Number(product.props.preco) * item.quantidade;
    }

    // Criar purchase
    const purchase = Purchase.create({
      userId,
      total,
    });

    await this.purchaseRepository.save(envs, purchase);

    const purchaseId = purchase.props.id!;

    // Criar itens + atualizar estoque
    items.forEach(async (item, index) => {
      const product = produtosValidos[index];

      const purchaseItem = PurchaseItem.create({
        purchaseId,
        productId: item.productId,
        quantidade: item.quantidade,
        precoUnitario: product.props.preco,
      });

      await this.purchaseItemRepository.save(envs, purchaseItem);

      await this.productsRepository.updatePartial(envs, product.props.id!, {
        estoque: product.props.estoque - item.quantidade,
      });
    });

    return {
      message: "Compra realizada com sucesso!",
      total,
      purchaseId,
    };
  }
}
