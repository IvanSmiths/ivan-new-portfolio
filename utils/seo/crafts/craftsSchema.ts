import { baseUrl } from "../../../_config/config";

export const craftsSchema = {
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
      name: "Crafts",
      item: `${baseUrl}/crafts`,
    },
  ],
};

export const rendersSchema = {
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
      name: "Crafts",
      item: `${baseUrl}/crafts`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Renders",
      item: `${baseUrl}/crafts/renders`,
    },
  ],
};

export const photosSchema = {
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
      name: "Crafts",
      item: `${baseUrl}/crafts`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Photos",
      item: `${baseUrl}/crafts/photos`,
    },
  ],
};
