import { wait } from "../../lib/wait/wait.cy";
import {
  checkAllBlogPost,
  checkBlogPostLength,
  checkBlogPostTitle,
} from "../../lib/home/blogPost.cy";

describe("Fetching Blog Posts", () => {
  beforeEach(() => {
    cy.visit("/");
    wait(5000);
  });

  it("Check blog posts", () => {
    checkAllBlogPost();
    checkBlogPostLength(2);
  });

  it("Correctly renders the metadata of each blog post", () => {
    checkBlogPostTitle();
  });
});
