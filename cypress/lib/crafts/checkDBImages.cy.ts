export const checkImages = (): void => {
  cy.get("[data-cy=DBImage]").each(($img): void => {
    cy.wrap($img)
      .scrollIntoView()
      .should("be.visible")
      .and(($img): void => {
        const img = $img[0] as HTMLImageElement;
        expect(img.naturalWidth).to.be.greaterThan(0);
        expect(img.naturalHeight).to.be.greaterThan(0);
      });
  });
};
