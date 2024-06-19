import { expect, Locator, test } from "@playwright/test";

test.beforeEach(async ({ page }): Promise<void> => {
  await page.goto("http://localhost:3000");
  await page
    .getByTestId("navbar")
    .evaluate(
      (element: HTMLElement): string => (element.style.display = "none"),
    );
});

test("snapshot home hero section", async ({ page }): Promise<void> => {
  const heroLocator: Locator = page.getByTestId("homeHero");
  await heroLocator.click();
  await expect(page).toHaveScreenshot("home-hero.png", {
    maxDiffPixelRatio: 0.2,
  });
});

test("snapshot home about section", async ({ page }): Promise<void> => {
  const aboutLocator: Locator = page.getByTestId("homeAbout");
  await aboutLocator.click();
  await expect(page).toHaveScreenshot("home-about.png");
});
