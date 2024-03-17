import { FC } from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

const Page: FC = () => {
  const postsDirectory = path.join(process.cwd(), "blogposts");
  const files = fs.readdirSync(postsDirectory);

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const fileContent = fs.readFileSync(
      path.join(postsDirectory, filename),
      "utf-8",
    );
    const { data: frontMatter } = matter(fileContent);
    return {
      slug,
      meta: frontMatter,
    };
  });
  return (
    <div>
      {posts.map((post) => (
        <Link key={post.slug} href={post.slug}>
          <div>{post.meta.title}</div>
        </Link>
      ))}
    </div>
  );
};

export default Page;
