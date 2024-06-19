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
  await takeSnapshot(page, "homeHero", "home-hero.png", {
    maxDiffPixelRatio: 0.2,
  });
});

test("snapshot home about section", async ({ page }): Promise<void> => {
  await takeSnapshot(page, "homeAbout", "home-about.png");
});

test("snapshot home first work", async ({ page }): Promise<void> => {
  await takeSnapshot(page, "homeWork0", "home-first-work.png");
});

test("snapshot home second work", async ({ page }): Promise<void> => {
  await takeSnapshot(page, "homeWork1", "home-second-work.png");
});

test("snapshot home third work", async ({ page }): Promise<void> => {
  await takeSnapshot(page, "homeWork2", "home-third-work.png");
});
