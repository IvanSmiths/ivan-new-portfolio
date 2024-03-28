export enum Pages {
  Home = "home",
  Works = "works",
}

type Page = Pages;

export const navigateAndCheckUrl = (page: Page): void => {
  const selector: string =
    page === Pages.Home ? `nav a[data-cy=${page}]` : `nav a[data-cy=${page}]`;
  const url: string = page === Pages.Home ? `/` : `${page}`;
  cy.get(selector).click();
  cy.url().should("include", url);
};
