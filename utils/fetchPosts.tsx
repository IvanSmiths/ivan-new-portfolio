import matter from "gray-matter";
import path from "path";
import fs from "fs/promises";
import { cache } from "react";

export const getPosts = cache(async () => {
  const posts: string[] = await fs.readdir("./blogposts/");

  return Promise.all(
    posts
      .filter(
        (file) => path.extname(file) === ".md" || path.extname(file) === ".mdx",
      )
      .map(async (file) => {
        const filePath = `./blogposts/${file}`;
        const postContent = await fs.readFile(filePath, "utf8");
        const { data, content } = matter(postContent);

        if (data.published === false) {
          return null;
        }

        return { ...data, body: content };
      }),
  );
});
export default getPosts;

export async function getPost(slug: string) {
  const posts = await getPosts();
  return posts.find((post) => post.slug === slug);
}
