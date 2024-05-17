import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const photos = sqliteTable("photos", {
  id: integer("id").primaryKey(),
  alt: text("name").notNull(),
  desktopUrl: text("desktopUrl").notNull(),
  tabletUrl: text("tabletUrl").notNull(),
  mobileUrl: text("mobileUrl").notNull(),
});
