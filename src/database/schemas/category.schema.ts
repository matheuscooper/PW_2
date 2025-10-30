import { pgTable, uuid, varchar, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

export const categorySchema = pgTable(
  "categorias",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    descricao: varchar("descricao").default("").notNull(),
    nome: varchar("nome", { length: 80 }).notNull(),
  },
  (t) => ({
    categoriasNomeUq: uniqueIndex("categorias_nome_uq").on(t.nome),
  })
);
