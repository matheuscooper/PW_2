import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const userTypeSchema = pgTable("User_Types", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});
