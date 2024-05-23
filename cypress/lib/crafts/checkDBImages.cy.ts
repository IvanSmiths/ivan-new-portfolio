export const checkImages = (): void => {
  cy.get("[data-cy=DBImage]").each((image): void => {
    cy.wrap(image)
      .should("be.visible")
      .should("exist")
      .then((img): void => {
        const imgElement = img[0] as HTMLImageElement;
        expect(imgElement.naturalWidth).to.be.greaterThan(0);
        expect(imgElement.naturalHeight).to.be.greaterThan(0);
      });
  });
};
