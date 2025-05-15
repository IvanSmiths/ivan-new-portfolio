import { test } from "@playwright/test";
import { snapshotElement } from "./helpers/screenshot";

test.beforeEach(async ({ page }): Promise<void> => {
  await page.goto("http://localhost:3000");
});

test("snapshot footer", async ({ page }): Promise<void> => {
  await page
    .getByTestId("navbar")
    .evaluate(
      (element: HTMLElement): string => (element.style.display = "none"),
    );
  await snapshotElement(page, "footer", "global-footer.png", {
    maxDiffPixelRatio: 0.2,
  });
});
