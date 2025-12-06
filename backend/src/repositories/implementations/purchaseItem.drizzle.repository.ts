import { IPurchaseItemRepository } from "../IPurchaseItem.repository";
import { purchaseItemSchema } from "../../database/schemas/purchasesItems.schema";
import { PurchaseItem } from "../../entities/purchaseItem";
import { drizzle } from "drizzle-orm/node-postgres";
import { EnvType } from "../../config/env";
import { eq } from "drizzle-orm";

export class PurchaseItemRepository implements IPurchaseItemRepository {
  private mapToEntity(row: typeof purchaseItemSchema.$inferSelect | null) {
    if (!row) return null;

    return PurchaseItem.create(
      {
        purchaseId: row.purchaseId,
        productId: row.productId,
        quantidade: row.quantidade,
        precoUnitario: String(row.precoUnitario),
      },
      row.id
    );
  }

  async save(envs: EnvType, item: PurchaseItem): Promise<void> {
    const db = drizzle(envs.DATABASE_URL);

    await db.insert(purchaseItemSchema).values({
      purchaseId: item.props.purchaseId,
      productId: item.props.productId,
      quantidade: item.props.quantidade,
      precoUnitario: item.props.precoUnitario.toString(),
    });
  }

  async findById(envs: EnvType, id: string): Promise<PurchaseItem | null> {
    const db = drizzle(envs.DATABASE_URL);

    const [row] = await db.select().from(purchaseItemSchema).where(eq(purchaseItemSchema.id, id)).limit(1);

    return this.mapToEntity(row);
  }

  async findByPurchase(envs: EnvType, purchaseId: string) {
    const db = drizzle(envs.DATABASE_URL);

    const rows = await db.select().from(purchaseItemSchema).where(eq(purchaseItemSchema.purchaseId, purchaseId));

    return rows.map((r) => this.mapToEntity(r)!);
  }
}
