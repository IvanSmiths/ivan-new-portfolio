import { checkImages } from "../../lib/crafts/checkDBImages.cy";
import { visitPageAndScrollToFooter } from "../../lib/crafts/visitPage.cy";

export enum PageUrls {
  Crafts = "/crafts",
  Photos = "/crafts/photos",
  Renders = "/crafts/renders",
}

export enum PageNames {
  Crafts = "Crafts",
  Photos = "Photos",
  Renders = "Renders",
}

export type PageConfig = {
  name: PageNames;
  url: PageUrls;
  timeout: number;
};

describe("Crafts Page", (): void => {
  const pages: PageConfig[] = [
    { name: PageNames.Crafts, url: PageUrls.Crafts, timeout: 8000 },
    { name: PageNames.Photos, url: PageUrls.Photos, timeout: 4000 },
    { name: PageNames.Renders, url: PageUrls.Renders, timeout: 4000 },
  ];

  pages.forEach(({ name, url, timeout }: PageConfig): void => {
    describe(`Checking images on ${name} page`, (): void => {
      beforeEach((): void => {
        visitPageAndScrollToFooter(url, timeout);
      });
      it("Should have a valid src attribute for each image", (): void => {
        checkImages();
      });
    });
  });
});
