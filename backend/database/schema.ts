import { createInsertSchema } from "drizzle-zod";
import { mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: varchar("id", { length: 36 }).primaryKey(),
  email: varchar("email", { length: 255 }).unique().notNull(),
});

export const insertAccountSchema = createInsertSchema(users);
