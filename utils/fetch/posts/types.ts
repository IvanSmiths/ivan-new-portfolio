export type PostCategory = "Guide" | "News";

export interface PostMetadata {
  title: string;
  publishedAt: string;
  description: string;
  cover: string;
  coverAlt: string;
  tags: string[];
  category: PostCategory;
}

export interface Post extends PostMetadata {
  slug: string;
}
