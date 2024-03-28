export enum Pages {
  HOME = "/",
  WORKS = "works",
}

type Page = Pages;

export const navigate = (page: Page): void => {
  const selector: string =
    page === Pages.HOME ? `nav a[href="${page}"]` : `nav a[href*="${page}"]`;
  cy.get(selector).click();
  cy.url().should("include", page);
};
