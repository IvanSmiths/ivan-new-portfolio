import type { WorkProjectPage } from "~/domain/works/types";

type WorkStructuredDataParams = {
  siteUrl: string;
  siteName: string;
  work: WorkProjectPage;
};

export function createWorkStructuredData({ siteUrl, siteName, work }: WorkStructuredDataParams) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${work.url}#work`,
        name: work.title,
        headline: work.title,
        description: work.metaDescription,
        image: work.homeImage,
        author: {
          "@type": "Person",
          name: siteName,
          url: siteUrl,
        },
        creator: {
          "@type": "Person",
          name: siteName,
        },
        datePublished: work.date || undefined,
        url: work.url,
        inLanguage: "en",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${work.url}#breadcrumbs`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: work.title,
            item: work.url,
          },
        ],
      },
    ],
  };
}

