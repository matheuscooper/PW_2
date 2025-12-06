import { pgTable, uuid, varchar, text, numeric, integer, uniqueIndex, timestamp } from "drizzle-orm/pg-core";
import { categorySchema } from "./category.schema";
import { relations } from "drizzle-orm";

export const productSchema = pgTable(
  "Product",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    nome: varchar("nome", { length: 120 }).notNull(),
    descricao: text("descricao").notNull().default("Geral"),
    categoriaId: uuid("categoria_id")
      .references(() => categorySchema.id, {
        onDelete: "restrict",
        onUpdate: "cascade",
      })
      .notNull(),
    preco: numeric("preco", { precision: 10, scale: 2 }).notNull(),
    estoque: integer("estoque").notNull().default(0),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => ({
    produtosNomeUq: uniqueIndex("produtos_nome_uq").on(t.nome),
  })
);

export const productRelations = relations(productSchema, ({ one }) => ({
  categoria: one(categorySchema, {
    fields: [productSchema.categoriaId],
    references: [categorySchema.id],
  }),
}));
