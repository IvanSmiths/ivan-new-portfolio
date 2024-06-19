import { test } from "@playwright/test";
import { takeSnapshot } from "./helpers";

test.beforeEach(async ({ page }): Promise<void> => {
  await page.goto("http://localhost:3000");
  await page
    .getByTestId("navbar")
    .evaluate(
      (element: HTMLElement): string => (element.style.display = "none"),
    );
});

test("snapshot home hero section", async ({ page }): Promise<void> => {
  await takeSnapshot(page, "homeHeroSection", "home-hero-section.png", {
    maxDiffPixelRatio: 0.2,
  });
});

test("snapshot home about section", async ({ page }): Promise<void> => {
  await takeSnapshot(page, "homeAboutSection", "home-about-section.png");
});

test("snapshot home works section", async ({ page }): Promise<void> => {
  await takeSnapshot(page, "homeWork0", "home-work-first.png");
  await takeSnapshot(page, "homeWork1", "home-work-second.png");
  await takeSnapshot(page, "homeWork2", "home-work-third.png");
});

test("snapshot home blog section", async ({ page }): Promise<void> => {
  await takeSnapshot(page, "homeBlogSection", "home-blog-section.png");
});
