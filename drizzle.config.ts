import type { Config } from "drizzle-kit";

export default {
    schema: "./utils/db/schema.ts",
    out: "./utils/db/migrations",
    driver: "turso",
    dialect: "sqlite",
} satisfies Config;