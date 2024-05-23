export const scrollToFooter = (): void => {
  cy.get("[data-cy=footer]").scrollIntoView();
};
