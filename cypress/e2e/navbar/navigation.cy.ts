import { navigate, Pages } from "../../lib/navbar/navbar.cy";
import { wait } from "../../lib/wait/wait.cy";

describe("Navigation", (): void => {
  it("should navigate through all pages", (): void => {
    cy.visit("/");
    wait(5000);
    navigate(Pages.WORKS);
    navigate(Pages.HOME);
  });
});
