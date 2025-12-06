import { IPurchaseRepository } from "../IPurchase.repository";
import { purchaseSchema } from "../../database/schemas/purchase.schema";
import { drizzle } from "drizzle-orm/node-postgres";
import { Purchase } from "../../entities/purchase";
import { eq } from "drizzle-orm";
import { EnvType } from "../../config/env";

export class PurchaseRepository implements IPurchaseRepository {
  private mapToEntity(raw: typeof purchaseSchema.$inferSelect | null) {
    if (!raw) return null;

    return Purchase.create(
      {
        userId: raw.userId,
        total: Number(raw.total),
        createdAt: raw.createdAt ?? undefined, // 🔥 FIX #1
      },
      raw.id
    );
  }

  async save(envs: EnvType, purchase: Purchase): Promise<string> {
    const db = drizzle(envs.DATABASE_URL);

    const [inserted] = await db
      .insert(purchaseSchema)
      .values({
        id: purchase.props.id,
        userId: purchase.props.userId,
        total: purchase.props.total.toString(),
      })
      .returning({ id: purchaseSchema.id });

    return inserted.id;
  }

  async findByUser(envs: EnvType, userId: string): Promise<Purchase[]> {
    const db = drizzle(envs.DATABASE_URL);

    const rows = await db.select().from(purchaseSchema).where(eq(purchaseSchema.userId, userId));

    return rows.map((r) => this.mapToEntity(r)).filter((p): p is Purchase => p !== null);
  }

  async findById(envs: EnvType, id: string): Promise<Purchase | null> {
    const db = drizzle(envs.DATABASE_URL);

    const [row] = await db.select().from(purchaseSchema).where(eq(purchaseSchema.id, id)).limit(1);

    return this.mapToEntity(row);
  }
}
