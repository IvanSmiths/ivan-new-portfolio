import { getAndCheckFilterPage } from "../../lib/crafts/filter.cy";

export enum Pages {
  Photos = "photos",
  Renders = "renders",
}

describe("Filter Navigation", (): void => {
  beforeEach((): void => {
    cy.visit("/crafts");
  });

  it('should navigate to the "photos" page', (): void => {
    getAndCheckFilterPage(Pages.Photos);
  });

  it('should navigate to the "renders" page', (): void => {
    getAndCheckFilterPage(Pages.Renders);
  });
});
