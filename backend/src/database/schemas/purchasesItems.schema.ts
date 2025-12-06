import { pgTable, uuid, integer, numeric } from "drizzle-orm/pg-core";
import { productSchema } from "./product.schema";
import { purchaseSchema } from "./purchase.schema";

export const purchaseItemSchema = pgTable("Purchase_Items", {
  id: uuid("id").defaultRandom().primaryKey(),

  purchaseId: uuid("purchase_id")
    .notNull()
    .references(() => purchaseSchema.id),

  productId: uuid("product_id")
    .notNull()
    .references(() => productSchema.id),

  quantidade: integer("quantidade").notNull(),

  precoUnitario: numeric("preco_unitario").notNull(),
});
