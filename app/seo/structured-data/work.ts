import type { WorkProjectPage } from "~/domain/works/types";

type WorkStructuredDataParams = {
  siteUrl: string;
  siteName: string;
  work: WorkProjectPage;
  breadcrumbHomeName: string;
  language: string;
};

export function createWorkStructuredData({
  siteUrl,
  siteName,
  work,
  breadcrumbHomeName,
  language,
}: WorkStructuredDataParams) {
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
        inLanguage: language,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${work.url}#breadcrumbs`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: breadcrumbHomeName,
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
