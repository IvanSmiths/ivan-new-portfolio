import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const photosTable = sqliteTable("photos", {
  id: integer("id").primaryKey(),
  alt: text("name").notNull(),
  desktopUrl: text("desktopUrl").notNull(),
  mobileUrl: text("mobileUrl").notNull(),
});