import {
  checkMetadata,
  checkTitle,
  checkUrl,
} from "../../lib/blogpage/blogPage";

describe("Blog Page", (): void => {
  beforeEach((): void => {
    cy.visit("/blog");
  });

  it("Should have correct URL and title for each blog page", (): void => {
    cy.get("[data-cy=blogPost]").each((post): void => {
      const url: string | undefined = post.attr("href");
      const title: string = post.find("[data-cy=blogPostTitle]").text();
      if (typeof url === "string") {
        cy.visit(url);
        checkUrl(url);
      }
      checkTitle(title);
      checkMetadata();
    });
  });
});
