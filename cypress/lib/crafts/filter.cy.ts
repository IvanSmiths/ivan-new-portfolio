import { Pages } from "../../e2e/crafts/filter.cy";

export const getAndCheckFilterPage = (url: Pages): void => {
  cy.get(`[data-cy=link-${url}]`).click();
  cy.url().should("include", url);
};
