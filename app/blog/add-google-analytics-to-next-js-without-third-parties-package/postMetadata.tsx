import { PostMetadata } from "../../../utils/fetch/posts/types";
import { generatePostMetadata } from "../../../utils/seo/blog/generatePostMetadata";

export const data: PostMetadata = {
  title: "How to Add Google Analytics to Next.js Without Third-Party Packages",
  description:
    "Learn how to add Google Analytics to your Next.js App Router project without relying on third-party libraries. This guide walks you through the setup using native Next.js features for a leaner, dependency-free implementation.",
  publishedAt: "2025-05-26",
  cover:
    "https://res.cloudinary.com/deino2cjx/image/upload/v1748246277/portfolio/blog/Next%20Google%20Analytics/cover_iplg3d.png",
  coverAlt: "next js google analytics logos",
  tags: [
    "Next.js",
    "Google Analytics",
    "App Router",
    "SEO",
    "Website Tracking",
  ],
  category: "Guide",
};

export const { postMetadata, postSchema } = generatePostMetadata(data);
