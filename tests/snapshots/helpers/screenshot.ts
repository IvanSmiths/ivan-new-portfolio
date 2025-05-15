import { expect, Locator, Page } from "@playwright/test";

type SnapshotOptions = {
  maxDiffPixelRatio?: number;
};

export const snapshotElement = async (
  page: Page,
  testId: string,
  screenshotName: string,
  options: SnapshotOptions = {},
): Promise<void> => {
  const locator: Locator = page.getByTestId(testId);
  await locator.click({ button: "middle" });
  await expect(locator).toHaveScreenshot(screenshotName, options);
};

export const snapshotViewport = async (
  page: Page,
  testId: string,
  screenshotName: string,
  options: SnapshotOptions = {},
): Promise<void> => {
  const locator: Locator = page.getByTestId(testId);
  await locator.click({ button: "middle" });
  await expect(page).toHaveScreenshot(screenshotName, options);
};
