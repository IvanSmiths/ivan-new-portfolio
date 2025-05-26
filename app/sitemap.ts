import { promises as fs } from "fs";
import path from "path";
import { MetadataRoute } from "next";
import {
  baseUrl,
  craftsSubRoutes,
  internalLinks,
  projectsSubRoutes,
  worksSubRoutes,
} from "../_config/config";

async function getBlogPostSlugs(): Promise<string[]> {
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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const mainRoutes = internalLinks.map((link) => ({
    url: link.url === internalLinks[0].url ? baseUrl : `${baseUrl}${link.url}`,
    lastModified: new Date().toISOString(),
    changeFrequency:
      link.url === internalLinks[0].url
        ? ("monthly" as const)
        : ("yearly" as const),
    priority: link.url === internalLinks[0].url ? 1.0 : 0.8,
  }));

  const worksRoutes = worksSubRoutes.map((route) => ({
    url: `${baseUrl}${internalLinks[1].url}/${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  const projectsRoutes = projectsSubRoutes.map((route) => ({
    url: `${baseUrl}${internalLinks[2].url}/${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  const blogSlugs = await getBlogPostSlugs();
  const blogRoutes = blogSlugs.map((slug) => ({
    url: `${baseUrl}${internalLinks[3].url}/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  const craftsRoutes = craftsSubRoutes.map((route) => ({
    url: `${baseUrl}${internalLinks[4].url}/${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  const allRoutes = [
    ...mainRoutes,
    ...worksRoutes,
    ...projectsRoutes,
    ...blogRoutes,
    ...craftsRoutes,
  ];

  console.log(`✅ Generated sitemap with ${allRoutes.length} URLs`);
  console.log(
    `📄 Main: ${mainRoutes.length}, Works: ${worksRoutes.length}, Projects: ${projectsRoutes.length}, Crafts: ${craftsRoutes.length}, Blog: ${blogRoutes.length}`,
  );

  return allRoutes;
}
