import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";

export const photos = sqliteTable("photos", {
    id: text('id').primaryKey().notNull(),
    url: text("url").notNull(),
    alt: text("alt").notNull(),
    width: integer("width").notNull(),
    height: integer("height").notNull(),
});

export const renders = sqliteTable("renders", {
    id: text('id').primaryKey().notNull(),
    url: text("url").notNull(),
    alt: text("alt").notNull(),
    width: integer("width").notNull(),
    height: integer("height").notNull(),
});
