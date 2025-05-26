import { PostMetadata } from "../../../utils/fetch/posts/types";
import { generatePostMetadata } from "../../../utils/seo/blog/generatePostMetadata";

export const data: PostMetadata = {
  title: "How to add Open Graph and Twitter metadata to Next.js app router",
  description:
    "Next.js App Router simplifies adding Open Graph and Twitter metadata. We'll walk through an easy implementation and testing in your dev setup. Let's level up your website's social game!",
  publishedAt: "2024-04-23",
  cover: "https://utfs.io/f/aCaScRJubtiPvv2th03UO3qozXDu8rHybdfWAaIZ6KiJ0lYk",
  coverAlt: "next js and open graph logos",
  tags: ["Next.js", "Metadata", "Open Graph", "Twitter", "App Router"],
  category: "Guide",
};

export const { postMetadata, postSchema } = generatePostMetadata(data);
