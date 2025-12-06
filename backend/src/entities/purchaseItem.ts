export type PurchaseItemProps = {
  id?: string;
  purchaseId: string | undefined;
  productId: string | undefined;
  quantidade: number;
  precoUnitario: string;
};

export class PurchaseItem {
  private constructor(public props: PurchaseItemProps) {}

  static create(props: Omit<PurchaseItemProps, "id">, id?: string) {
    return new PurchaseItem({ ...props, id });
  }
}
