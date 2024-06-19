import { defineConfig, devices } from "@playwright/test";

const requiredEnvVars = [
  "HYGRAPH_ENDPOINT",
  "OPEN_WEATHER_API",
  "TURSO_TOKEN",
  "TURSO_CONNECTION_URL",
] as const;
type RequiredEnvVar = (typeof requiredEnvVars)[number];

requiredEnvVars.forEach((varName: RequiredEnvVar) => {
  if (!process.env[varName]) {
    throw new Error(`Environment variable ${varName} is not set`);
  }
});
export default defineConfig({
  testDir: "./snapshots",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  webServer: {
    command: "npm run dev",
    url: "http://127.0.0.1:3000",
    env: {
      HYGRAPH_ENDPOINT: process.env.HYGRAPH_ENDPOINT as string,
      OPEN_WEATHER_API: process.env.OPEN_WEATHER_API as string,
      TURSO_TOKEN: process.env.TURSO_TOKEN as string,
      TURSO_CONNECTION_URL: process.env.TURSO_CONNECTION_URL as string,
    },
    reuseExistingServer: !process.env.CI,
  },
  use: {
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
  ],
});
