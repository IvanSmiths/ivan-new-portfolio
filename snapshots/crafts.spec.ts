import { test } from "@playwright/test";
import { takeSnapshot } from "./helpers/screenshot";

test.beforeEach(async ({ page }): Promise<void> => {
  await page.goto("http://localhost:3000/crafts");
  await page
    .getByTestId("navbar")
    .evaluate(
      (element: HTMLElement): string => (element.style.display = "none"),
    );
});

test("snapshot crafts main page", async ({ page }): Promise<void> => {
  await takeSnapshot(
    page,
    "craftsCraftsTitleSection",
    "crafts-crafts-title-section.png",
  );
});

test("snapshot crafts photos page", async ({ page }): Promise<void> => {
  await page.goto("http://localhost:3000/crafts/photos");
  await takeSnapshot(
    page,
    "craftsPhotosTitleSection",
    "crafts-photos-title-section.png",
  );
});

test("snapshot crafts renders page", async ({ page }): Promise<void> => {
  await page.goto("http://localhost:3000/crafts/renders");
  await takeSnapshot(
    page,
    "craftsRendersTitleSection",
    "crafts-renders-title-section.png",
  );
});
