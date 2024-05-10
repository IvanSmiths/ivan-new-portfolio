import type { Config } from "drizzle-kit";

export default {
    schema: "./utils/db/schema.ts",
    out: "./utils/db/migrations",
    driver: "turso",
    dialect: "sqlite",
    dbCredentials: {
        url: process.env.TURSO_DATABASE_URL!,
        authToken: process.env.TURSO_AUTH_TOKEN,
    },
} satisfies Config;