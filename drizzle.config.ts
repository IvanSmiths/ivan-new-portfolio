import type { Config } from "drizzle-kit";

export default {
    schema: "./utils/db/schema.ts",
    out: "./utils/db/migrations",
    driver: "turso",
    dialect: "sqlite",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
        authToken: process.env.DATABASE_AUTH_TOKEN,
    },
} satisfies Config;