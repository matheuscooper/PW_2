import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { userTypeSchema } from "./userTypes.schema";
import { relations } from "drizzle-orm";
import { addressesSchema } from "./adress.schema";

export const userSchema = pgTable("Users", {
  id: uuid("id").defaultRandom().primaryKey(),
  nome: text("nome").notNull(),
  email: text("email").notNull().unique(),
  cpf: text("cpf").notNull().unique(),
  senha: text("senha").notNull(),
  userType: text("user_type").notNull(),
});

export const userRelations = relations(userSchema, ({ many }) => ({
  addresses: many(addressesSchema),
}));
