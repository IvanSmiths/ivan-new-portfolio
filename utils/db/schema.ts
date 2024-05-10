import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";

export const photos = sqliteTable("photos", {
    id: text('id').primaryKey(),
    url: text("url").notNull(),
    alt: text("alt").notNull(),
    width: integer("width").notNull(),
    height: integer("height").notNull(),
});
