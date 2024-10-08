import {
    mysqlTable,
    timestamp,
    varchar
} from "drizzle-orm/mysql-core";
import { z } from "zod";

export const users = mysqlTable("users", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  username: varchar("username", { length: 255 }).unique().notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 15 }).notNull(),
  avatar: varchar("avatar", { length: 255 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
  roleId: varchar("role_id", { length: 36 }).notNull().references(() => roles.id),
});

export const roles = mysqlTable("roles", {
    id: varchar("id", { length: 36 }).primaryKey(),
    name: varchar("name", { length: 255 }).unique().notNull(),
});

export const insertUsersSchema = z.object({
    name: z.string().min(1),
    username: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6).optional(),
    phone: z.string(),
    avatar: z.string().nullable().optional(),
    roleName: z.string().default("user"),
});

export const updateUserSchema = z.object({
    name: z.string().min(1).optional(),
    username: z.string().min(1).optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    avatar: z.string().nullable().optional(),
})

export const changePasswordSchema = z.object({
    oldPassword: z.string().min(6),
    newPassword: z.string().min(6),
    confirmNewPassword: z.string().min(6),
});
