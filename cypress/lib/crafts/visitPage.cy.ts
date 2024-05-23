import { CraftsPagesUrls } from "../../e2e/crafts/images.cy";

export const visitCraftsPages = (url: CraftsPagesUrls): void => {
  cy.visit(url);
};
