import { baseUrl } from "../../../../_config/config";

type pageProps = {
  slug: string;
  name: string;
};

export const pageSchema = (entry: pageProps, path: string) => {
  return {
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
        item: `{${baseUrl}/${path}}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: entry.name,
        item: `{${baseUrl}/${path}/${entry.slug}}`,
      },
    ],
  };
};
