import { test } from "@playwright/test";
import { snapshotElement } from "./helpers/screenshot";

test.beforeEach(async ({ page }): Promise<void> => {
  await page.goto("http://localhost:3000");
});

test("snapshot navbar", async ({ page }): Promise<void> => {
  await snapshotElement(page, "navbar", "global-navbar.png");
});

test("snapshot footer", async ({ page }): Promise<void> => {
  await page
    .getByTestId("navbar")
    .evaluate(
      (element: HTMLElement): string => (element.style.display = "none"),
    );
  await snapshotElement(page, "footer", "global-footer.png");
});
