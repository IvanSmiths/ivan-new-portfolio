import fs from "node:fs";
import path from "node:path";
import { extractPostMetadata } from "./extractMetadataExport";
import type { Post } from "./types";

export function getPosts(count?: number): Post[] {
  const postsDirectory = path.join(process.cwd(), "pages/blog");
  const directories = fs
    .readdirSync(postsDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const posts: Post[] = [];

  for (const dir of directories) {
    const metadataPath = path.join(postsDirectory, dir, "postMetadata.tsx");
    if (fs.existsSync(metadataPath)) {
      const fileContents = fs.readFileSync(metadataPath, "utf8");
      try {
        const metadata = extractPostMetadata(fileContents);
        if (metadata) {
          posts.push({
            slug: dir,
            title: metadata.title || dir,
            publishedAt: metadata.publishedAt,
            description: metadata.description,
            cover: metadata.cover,
            coverAlt: metadata.coverAlt,
            tags: metadata.tags,
            category: metadata.category
          });
        }
      } catch (error) {
        console.error(`Error processing ${dir}:`, error);
      }
    }
  }

  const sortedPosts = posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return typeof count === "number" ? sortedPosts.slice(0, count) : sortedPosts;
}
