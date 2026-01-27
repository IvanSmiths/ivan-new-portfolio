import type { GetServerSideProps } from "next";
import { baseUrl, internalRoutes, worksSubRoutes } from "../_config/config";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const mainRoutes = internalRoutes.map((link) => ({
    url: link.url === internalRoutes[0].url ? baseUrl : `${baseUrl}${link.url}`,
    lastModified: new Date().toISOString(),
    changeFrequency:
      link.url === internalRoutes[0].url ? "monthly" : "yearly",
    priority: link.url === internalRoutes[0].url ? 1.0 : 0.8
  }));

  const worksRoutes = worksSubRoutes.map((route) => ({
    url: `${baseUrl}${internalRoutes[1].url}/${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "yearly",
    priority: 0.7
  }));

  // Static blog routes for now - can be updated later
  const blogRoutes = [
    {
      url: `${baseUrl}${internalRoutes[2].url}/add-google-analytics-to-next-js-without-third-parties-package`,
      lastModified: new Date().toISOString(),
      changeFrequency: "yearly" as const,
      priority: 0.7
    }
  ];

  const allRoutes = [...mainRoutes, ...worksRoutes, ...blogRoutes];

  console.log(`✅ Generated sitemap with ${allRoutes.length} URLs`);
  console.log(
    `📄 Main: ${mainRoutes.length}, Works: ${worksRoutes.length}, Blog: ${blogRoutes.length}`
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map((entry) => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastModified}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {}
  };
};

const Sitemap: React.FC = () => null;

export default Sitemap;
