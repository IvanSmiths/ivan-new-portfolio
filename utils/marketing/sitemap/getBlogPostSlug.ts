import { promises as fs } from "node:fs";
import path from "node:path";

export async function getBlogPostSlugs(): Promise<string[]> {
  try {
    const blogDirectory = path.join(process.cwd(), "pages", "blog");
    const entries = await fs.readdir(blogDirectory, { withFileTypes: true });
    const slugs: string[] = [];

    for (const entry of entries) {
      if (entry.isDirectory() && entry.name !== "data") {
        const dirPath = path.join(blogDirectory, entry.name);
        try {
          const dirContents = await fs.readdir(dirPath);
          if (
            dirContents.includes("index.mdx") ||
            dirContents.includes("index.js")
          ) {
            slugs.push(entry.name);
          }
        } catch (error) {
          console.error(`❌ Error reading directory ${entry.name}:`, error);
        }
      }
    }
    return slugs;
  } catch (error) {
    console.error(`❌ Error reading blog directory:`, error);
    return [];
  }
}
