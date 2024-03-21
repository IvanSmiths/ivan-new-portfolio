import { navigate, Pages } from "../helpers/nav.cy";
import { wait } from "../helpers/wait.cy";

describe("Navigation", () => {
  it("should navigate through all pages", () => {
    cy.visit("/");
    wait(5000);
    navigate(Pages.WORKS);
    navigate(Pages.HOME);
  });
});
