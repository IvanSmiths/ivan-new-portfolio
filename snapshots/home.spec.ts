import { expect, Locator, Page, test } from "@playwright/test";

test.beforeEach(async ({ page }): Promise<void> => {
  await page.goto("http://localhost:3000");
  await page
    .getByTestId("navbar")
    .evaluate(
      (element: HTMLElement): string => (element.style.display = "none"),
    );
});

type SnapshotOptions = {
  maxDiffPixelRatio?: number;
};

const takeSnapshot = async (
  page: Page,
  testId: string,
  screenshotName: string,
  options: SnapshotOptions = {},
): Promise<void> => {
  const locator: Locator = page.getByTestId(testId);
  await locator.click();
  await expect(page).toHaveScreenshot(screenshotName, options);
};

test("snapshot home hero section", async ({ page }): Promise<void> => {
  await takeSnapshot(page, "homeHeroSection", "home-hero-section.png", {
    maxDiffPixelRatio: 0.2,
  });
});

test("snapshot home about section", async ({ page }): Promise<void> => {
  await takeSnapshot(page, "homeAboutSection", "home-about-section.png");
});

test("snapshot home work first", async ({ page }): Promise<void> => {
  await takeSnapshot(page, "homeWork0", "home-work-first.png");
});

test("snapshot home work second", async ({ page }): Promise<void> => {
  await takeSnapshot(page, "homeWork1", "home-work-second.png");
});

test("snapshot home work third", async ({ page }): Promise<void> => {
  await takeSnapshot(page, "homeWork2", "home-work-third.png");
});
