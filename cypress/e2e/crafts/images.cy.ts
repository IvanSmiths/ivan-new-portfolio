import { wait } from "../../lib/actions/wait.cy";
import { scroll } from "../../lib/actions/scroll.cy";

describe("Crafts Page", (): void => {
  beforeEach(() => {
    cy.visit("/crafts");
  });

  it("Should have a valid src attribute for each image", (): void => {
    scroll(999999);
    wait(1000);
    cy.get("[data-cy=DBImage]").each((image): void => {
      cy.wrap(image)
        .should("be.visible")
        .then((img): void => {
          const imgElement = img[0] as HTMLImageElement;
          expect(imgElement.naturalWidth).to.be.greaterThan(0);
        });
    });
  });
});
