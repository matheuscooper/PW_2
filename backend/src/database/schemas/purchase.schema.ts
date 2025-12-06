import { pgTable, uuid, timestamp, numeric } from "drizzle-orm/pg-core";
import { userSchema } from "./user.schema";
import { relations } from "drizzle-orm";
import { purchaseItemSchema } from "./purchasesItems.schema";

export const purchaseSchema = pgTable("Purchases", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => userSchema.id),

  total: numeric("total").notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});

export const purchaseRelations = relations(purchaseSchema, ({ one, many }) => ({
  user: one(userSchema, {
    fields: [purchaseSchema.userId],
    references: [userSchema.id],
  }),

  items: many(purchaseItemSchema),
}));
