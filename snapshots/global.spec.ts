import { test } from "@playwright/test";
import { takeSnapshot } from "./helpers";

test.beforeEach(async ({ page }): Promise<void> => {
  await page.goto("http://localhost:3000");
});

test("snapshot navbar", async ({ page }): Promise<void> => {
  await takeSnapshot(page, "navbar", "global-navbar.png");
});

test("snapshot footer", async ({ page }): Promise<void> => {
  await page
    .getByTestId("navbar")
    .evaluate(
      (element: HTMLElement): string => (element.style.display = "none"),
    );
  await takeSnapshot(page, "footer", "global-footer.png");
});
