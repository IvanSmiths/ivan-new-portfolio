import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }): Promise<void> => {
  await page.goto("http://localhost:3000");
});

test("snapshot home hero section", async ({ page }): Promise<void> => {
  await page.goto("http://localhost:3000");
  await expect(page).toHaveScreenshot("home-hero.png");
});
