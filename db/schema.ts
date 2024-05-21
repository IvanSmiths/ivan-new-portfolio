import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const photos = sqliteTable("photos", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  desktopUrl: text("desktop_url").notNull(),
  mobileUrl: text("mobile_url").notNull(),
  alt: text("alt").notNull(),
  isHorizontal: integer("is_horizontal", { mode: "boolean" }).default(false),
});

export const renders = sqliteTable("renders", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  desktopUrl: text("desktop_url").notNull(),
  mobileUrl: text("mobile_url").notNull(),
  alt: text("alt").notNull(),
  isHorizontal: integer("is_horizontal", { mode: "boolean" })
    .default(false)
    .notNull(),
});
