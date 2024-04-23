import { wait } from "../../lib/wait/wait.cy";
import {
  checkAllBlogPost,
  checkBlogPostLength,
  checkBlogPostMetadata,
} from "../../lib/home/blogPost.cy";

describe("Blog Posts", (): void => {
  beforeEach(() => {
    cy.visit("/");
    wait(5000);
  });

  it("Check blog posts", () => {
    checkAllBlogPost();
    checkBlogPostLength(1);
  });

  it("Correctly renders the metadata of each blog post", () => {
    checkBlogPostMetadata("[data-cy=blogPostTitle]");
    checkBlogPostMetadata("[data-cy=blogPostCategory]");
    checkBlogPostMetadata("[data-cy=blogPostDate]");
    checkBlogPostMetadata("[data-cy=blogPostTime]");
    checkBlogPostMetadata("[data-cy=blogPostIndex]");
  });
});
