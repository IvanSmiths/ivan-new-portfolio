type LabStructuredDataExperiment = {
  title: string;
  link: string;
};

type LabStructuredDataParams = {
  siteUrl: string;
  pageTitle: string;
  pageDescription: string;
  experiments: LabStructuredDataExperiment[];
  aboutTopics: string[];
  breadcrumbHomeName: string;
  breadcrumbLabName: string;
};

export function createLabStructuredData({
  siteUrl,
  pageTitle,
  pageDescription,
  experiments,
  aboutTopics,
  breadcrumbHomeName,
  breadcrumbLabName,
}: LabStructuredDataParams) {
  const labUrl = `${siteUrl}/lab`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${labUrl}#lab`,
        url: labUrl,
        name: pageTitle,
        description: pageDescription,
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
        about: aboutTopics,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${labUrl}#breadcrumbs`,
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
            name: breadcrumbLabName,
            item: labUrl,
          },
        ],
      },
      {
        "@type": "ItemList",
        itemListElement: experiments.map((ex, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: ex.title,
          url: ex.link,
        })),
      },
    ],
  };
}
