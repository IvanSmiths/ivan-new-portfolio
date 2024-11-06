import { test } from "@playwright/test";
import { snapshotElement } from "./helpers/screenshot";

test.beforeEach(async ({ page }): Promise<void> => {
  await page.goto("http://localhost:3000");
});

test("snapshot home hero section", async ({ page }): Promise<void> => {
  await snapshotElement(page, "homeHeroSection", "home-hero-section.png", {
    maxDiffPixelRatio: 0.2,
  });
});
