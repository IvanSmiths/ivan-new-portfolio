export const checkUrl = (url: string): void => {
  cy.url().should("include", url);
};

export const checkTitle = (title: string): void => {
  cy.get("[data-cy=blogPageTitle]").should("contain", title);
};

export const checkMetadata = (): void => {
  cy.get("[data-cy=blogPageCategory]").should("exist").should("not.be.empty");
  cy.get("[data-cy=blogPageExcerpt]").should("exist").should("not.be.empty");
  cy.get("[data-cy=blogPageDate]").should("exist").should("not.be.empty");
  cy.get("[data-cy=blogPageTime]").should("exist").should("not.be.empty");
  cy.get("[data-cy=blogPageTag]").should("exist").should("not.be.empty");
  cy.get("[data-cy=blogPageBody]").should("exist").should("not.be.empty");
  cy.get("[data-cy=blogPageCover]")
    .should("exist")
    .should("have.attr", "src")
    .should("not.be.empty");
};
