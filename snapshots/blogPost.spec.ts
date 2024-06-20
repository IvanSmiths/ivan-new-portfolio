import { test } from "@playwright/test";
import { snapshotElement, snapshotViewport } from "./helpers/screenshot";

test("snapshot blog post", async ({ page }): Promise<void> => {
  await page.goto("http://localhost:3000/blog");
  await page
    .getByTestId("navbar")
    .evaluate(
      (element: HTMLElement): string => (element.style.display = "none"),
    );
  await page.getByTestId("blogPostLink0").click();
  await snapshotViewport(
    page,
    "blogPostHeroSection",
    "blogPost-hero-section-viewport.png",
  );
  await snapshotElement(
    page,
    "blogPostHeroSection",
    "blogPost-hero-section.png",
  );
});
