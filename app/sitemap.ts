import { MetadataRoute } from "next";
import {
  baseUrl,
  craftsSubRoutes,
  internalRoutes,
  projectsSubRoutes,
  worksSubRoutes,
} from "../_config/config";
import { getBlogPostSlugs } from "../utils/sitemap/getBlogPostSlug";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const mainRoutes = internalRoutes.map((link) => ({
    url: link.url === internalRoutes[0].url ? baseUrl : `${baseUrl}${link.url}`,
    lastModified: new Date().toISOString(),
    changeFrequency:
      link.url === internalRoutes[0].url
        ? ("monthly" as const)
        : ("yearly" as const),
    priority: link.url === internalRoutes[0].url ? 1.0 : 0.8,
  }));

  const worksRoutes = worksSubRoutes.map((route) => ({
    url: `${baseUrl}${internalRoutes[1].url}/${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  const projectsRoutes = projectsSubRoutes.map((route) => ({
    url: `${baseUrl}${internalRoutes[2].url}/${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  const blogSlugs = await getBlogPostSlugs();
  const blogRoutes = blogSlugs.map((slug) => ({
    url: `${baseUrl}${internalRoutes[3].url}/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  const craftsRoutes = craftsSubRoutes.map((route) => ({
    url: `${baseUrl}${internalRoutes[4].url}/${route}`,
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
