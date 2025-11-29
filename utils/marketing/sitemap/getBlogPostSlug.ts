import path from "path";
import { promises as fs } from "fs";

export async function getBlogPostSlugs(): Promise<string[]> {
  try {
    const blogDirectory = path.join(process.cwd(), "app", "blog");
    const entries = await fs.readdir(blogDirectory, { withFileTypes: true });
    const slugs: string[] = [];

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const dirPath = path.join(blogDirectory, entry.name);
        try {
          const dirContents = await fs.readdir(dirPath);
          if (dirContents.includes("page.mdx")) {
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
