import matter from "gray-matter";
import path from "path";
import fs from "fs/promises";
import { cache } from "react";

export type Post = {
  body: string;
  category: string;
  cover?: string;
  coverAlt?: string;
  coverWidth?: number;
  coverHeight?: number;
  date: string;
  excerpt: string;
  slug: string | undefined;
  tags: string;
  title: string;
  time: number;
};

export type Posts = Post | null;

export const getPosts = cache(async () => {
  const posts: string[] = await fs.readdir("./blogposts/");

  return Promise.all(
    posts
      .filter(
        (file) => path.extname(file) === ".md" || path.extname(file) === ".mdx",
      )
      .map(async (file): Promise<Post> => {
        const filePath = `./blogposts/${file}`;
        const postContent = await fs.readFile(filePath, "utf8");
        const { data, content } = matter(postContent);
        return { ...data, body: content } as Post;
      }),
  );
});
export default getPosts;

export async function getPost(slug: string): Promise<Posts | undefined> {
  const posts: Posts[] = await getPosts();
  return posts.find((post: Posts): boolean => post?.slug === slug);
}
