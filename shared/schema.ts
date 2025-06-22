import { pgTable, text, serial, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  nombres: text("nombres").notNull(),
  apellidos: text("apellidos").notNull(),
  dni: text("dni").notNull().unique(),
  celular: text("celular").notNull(),
  email: text("email").notNull().unique(),
  fechaNacimiento: text("fecha_nacimiento"),
  password: text("password").notNull(),
  aceptaDatos: boolean("acepta_datos").default(false),
  aceptaAnuncios: boolean("acepta_anuncios").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const blockRequests = pgTable("block_requests", {
  id: serial("id").primaryKey(),
  userId: text("user_dni").notNull(),
  selectedProducts: text("selected_products").notNull(), // JSON string
  status: text("status").notNull().default("completed"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertBlockRequestSchema = createInsertSchema(blockRequests).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertBlockRequest = z.infer<typeof insertBlockRequestSchema>;
export type BlockRequest = typeof blockRequests.$inferSelect;
