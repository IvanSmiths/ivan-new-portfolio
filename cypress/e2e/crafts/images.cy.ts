import { wait } from "../../lib/actions/wait.cy";
import { scrollToFooter } from "../../lib/actions/scroll.cy";

describe("Crafts Page", (): void => {
  beforeEach(() => {
    cy.visit("/crafts");
    scrollToFooter();
    wait(10000);
  });

  it("Should have a valid src attribute for each image", (): void => {
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
  });
});
