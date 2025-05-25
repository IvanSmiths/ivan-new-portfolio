import { baseUrl } from "../../../_config/config";

export const pagesSchema = (type: string) => ({
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
      name: "Works",
      item: `{${baseUrl}${type}}`,
    },
  ],
});
