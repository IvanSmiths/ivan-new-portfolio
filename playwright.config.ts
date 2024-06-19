import { defineConfig, devices } from "@playwright/test";

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
      HYGRAPH_ENDPOINT: "HYGRAPH_ENDPOINT",
      OPEN_WEATHER_API: "OPEN_WEATHER_API",
      TURSO_TOKEN: "TURSO_TOKEN",
      TURSO_CONNECTION_URL: "TURSO_CONNECTION_URL",
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
