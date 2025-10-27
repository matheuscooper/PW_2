import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const categorySchema = pgTable(
  "categorias",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    descricao: varchar("descricao").default(""),
    nome: varchar("nome", { length: 80 }).notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => ({
    categoriasNomeUq: uniqueIndex("categorias_nome_uq").on(t.nome),
  })
);
