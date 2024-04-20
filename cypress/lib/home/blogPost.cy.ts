export const checkAllBlogPost = (): void => {
  cy.get("[data-cy=blogPost]").should("have.length.at.least", 1);
};

export const checkBlogPostLength = (lenght: number): void => {
  cy.get("[data-cy=blogPost]").should("have.length.at.least", lenght);
};

export const checkBlogPostTitle = (): void => {
  cy.get("[data-cy=blogPost]").each(($post) => {
    cy.wrap($post)
      .find("[data-cy=blogPostTitle]")
      .invoke("text")
      .then((title) => {
        const expectedTitle = title.trim();
        expect(expectedTitle).to.exist;
      });
  });
};
