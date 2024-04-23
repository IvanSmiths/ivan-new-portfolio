export const checkAllBlogPost = (): void => {
  cy.get("[data-cy=blogPost]").should("have.length.at.least", 1);
};

export const checkBlogPostLength = (length: number): void => {
  cy.get("[data-cy=blogPost]").should("not.have.lengthOf.at.most", length);
};

export const checkBlogPostMetadata = (metadata: string): void => {
  cy.get("[data-cy=blogPost]").each(($post) => {
    cy.wrap($post)
      .find(metadata)
      .invoke("text")
      .then((metadata) => {
        const expectedMetadata = metadata.trim();
        expect(expectedMetadata).to.exist;
        expect(expectedMetadata).not.to.be.empty;
      });
  });
};
