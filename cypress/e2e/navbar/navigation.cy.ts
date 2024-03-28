import { navigateAndCheckUrl, Pages } from "../../lib/navbar/navbar.cy";
import { wait } from "../../lib/wait/wait.cy";

describe("Navigation", (): void => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("should navigate through all pages", (): void => {
    wait(5000);
    navigateAndCheckUrl(Pages.Works);
    navigateAndCheckUrl(Pages.Home);
  });
});
