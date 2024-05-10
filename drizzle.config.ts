import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

export default {
    schema: "./utils/db/schema.ts",
    out: "./utils/db/migrations",
    driver: "turso",
    dialect: "sqlite",
    dbCredentials: {
        url: process.env.DATABASE_URL! as string,
        authToken: process.env.DATABASE_AUTH_TOKEN as string,
    },
} satisfies Config;