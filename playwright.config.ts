import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./snapshots",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  // @ts-ignore
  webServer: {
    command: "npm run dev",
    url: "http://127.0.0.1:3000",
    env: {
      HYGRAPH_ENDPOINT: process.env.HYGRAPH_ENDPOINT,
      OPEN_WEATHER_API: process.env.OPEN_WEATHER_API,
      TURSO_TOKEN: process.env.TURSO_TOKEN,
      TURSO_CONNECTION_URL: process.env.TURSO_CONNECTION_URL,
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
