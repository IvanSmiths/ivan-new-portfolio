import { test } from "@playwright/test";
import { snapshotElement } from "./helpers/screenshot";

test.beforeEach(async ({ page }): Promise<void> => {
  await page.goto("http://localhost:3000");
  await page
    .getByTestId("navbar")
    .evaluate(
      (element: HTMLElement): string => (element.style.display = "none"),
    );
});

test("snapshot home hero section", async ({ page }): Promise<void> => {
  await snapshotElement(page, "homeHeroSection", "home-hero-section.png", {
    maxDiffPixelRatio: 0.2,
  });
});

test("snapshot home about section", async ({ page }): Promise<void> => {
  await snapshotElement(page, "homeAboutSection", "home-about-section.png");
});

test("snapshot home works section", async ({ page }): Promise<void> => {
  await snapshotElement(page, "homeWork0", "home-work-first.png");
  await snapshotElement(page, "homeWork1", "home-work-second.png");
  await snapshotElement(page, "homeWork2", "home-work-third.png");
});

test("snapshot home blog section", async ({ page }): Promise<void> => {
  await snapshotElement(page, "homeBlogSection", "home-blog-section.png");
});
