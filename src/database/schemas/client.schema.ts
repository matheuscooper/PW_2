import { pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core";

export const clientSchema = pgTable("clientes", {
  id: uuid("id").defaultRandom().primaryKey(),
  nome: text("nome").notNull(),
  login: text("login").notNull().unique(),
  email: text("email").notNull().unique(),
  cpf: text("cpf").notNull().unique(),
  senha: text("senha").notNull(),
});
