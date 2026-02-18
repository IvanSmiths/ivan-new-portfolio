import { baseUrl } from "../../../../_config/config";

export const blogsSchema = {
  "@context": "http://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: baseUrl,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blogs",
      item: `${baseUrl}/blog`,
    },
  ],
};
