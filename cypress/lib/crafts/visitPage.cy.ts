import { wait } from "../actions/wait.cy";
import { scrollToFooter } from "../actions/scroll.cy";
import { PageUrls } from "../../e2e/crafts/images.cy";

export const visitPageAndScrollToFooter = (
  url: PageUrls,
  timeout: number,
): void => {
  cy.visit(url);
  scrollToFooter();
  wait(timeout);
};
