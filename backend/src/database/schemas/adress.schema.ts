import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { userSchema } from "./user.schema";

export const addressesSchema = pgTable("Addresses", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => userSchema.id, { onDelete: "cascade" }),

  cep: varchar("cep", { length: 9 }).notNull(),
  rua: varchar("rua", { length: 255 }).notNull(),
  numero: varchar("numero", { length: 20 }).notNull(),
  bairro: varchar("bairro", { length: 255 }).notNull(),
  cidade: varchar("cidade", { length: 255 }).notNull(),
  estado: varchar("estado", { length: 2 }).notNull(), // "AM"
  complemento: varchar("complemento", { length: 255 }),

  createdAt: timestamp("created_at").defaultNow(),
});

export const addressesRelations = relations(addressesSchema, ({ one }) => ({
  user: one(userSchema, {
    fields: [addressesSchema.userId],
    references: [userSchema.id],
  }),
}));
