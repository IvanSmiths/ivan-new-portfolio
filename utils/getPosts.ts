import matter from "gray-matter";
import path from "path";
import fs from "fs/promises";
import { cache } from "react";

export type Post = {
  body: string;
  category: string;
  cover: string;
  coverAlt: string;
  coverWidth: number;
  coverHeight: number;
  date: string;
  excerpt: string;
  slug: string | undefined;
  tags: string;
  title: string;
  time: number;
};

export type Posts = Post | null;

export const getPosts = cache(async (limit?: number) => {
  const posts: string[] = await fs.readdir("./blogposts/");

  let filteredPosts = posts.filter(
    (file) => path.extname(file) === ".md" || path.extname(file) === ".mdx",
  );

  if (limit !== undefined) {
    filteredPosts = filteredPosts.slice(0, limit);
  }

  return Promise.all(
    filteredPosts.map(async (file): Promise<Post> => {
      const filePath = `./blogposts/${file}`;
      const postContent = await fs.readFile(filePath, "utf8");
      const { data, content } = matter(postContent);
      return { ...data, body: content } as Post;
    }),
  );
});
export default getPosts;

export async function getPost(slug: string): Promise<Post | undefined> {
  const posts: Post[] = await getPosts();
  return posts.find((post: Post): boolean => post?.slug === slug);
}
