import { checkImages } from "../../lib/crafts/checkDBImages.cy";
import { visitCraftsPages } from "../../lib/crafts/visitPage.cy";

export enum CraftsPagesUrls {
  Crafts = "/crafts",
  Photos = "/crafts/photos",
  Renders = "/crafts/renders",
}

export enum CraftsPagesNames {
  Crafts = "Crafts",
  Photos = "Photos",
  Renders = "Renders",
}

export type CraftsPagesConfig = {
  name: CraftsPagesNames;
  url: CraftsPagesUrls;
};

describe("Crafts Page", (): void => {
  const pages: CraftsPagesConfig[] = [
    { name: CraftsPagesNames.Crafts, url: CraftsPagesUrls.Crafts },
    { name: CraftsPagesNames.Photos, url: CraftsPagesUrls.Photos },
    { name: CraftsPagesNames.Renders, url: CraftsPagesUrls.Renders },
  ];

  pages.forEach(({ name, url }: CraftsPagesConfig): void => {
    describe(`Checking images on ${name} page`, (): void => {
      beforeEach((): void => {
        visitCraftsPages(url);
      });
      it("Should have a valid src attribute for each image", (): void => {
        checkImages();
      });
    });
  });
});
