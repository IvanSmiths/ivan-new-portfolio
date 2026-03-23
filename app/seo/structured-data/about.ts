type AboutStructuredDataParams = {
  siteUrl: string;
  siteName: string;
  pageTitle: string;
  pageDescription: string;
  imageUrl: string;
  jobTitle: string;
  worksForName: string;
  homeLocationName: string;
  breadcrumbHomeName: string;
  breadcrumbAboutName: string;
};

export function createAboutStructuredData({
  siteUrl,
  siteName,
  pageTitle,
  pageDescription,
  imageUrl,
  jobTitle,
  worksForName,
  homeLocationName,
  breadcrumbHomeName,
  breadcrumbAboutName,
}: AboutStructuredDataParams) {
  const aboutUrl = `${siteUrl}/about`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: siteName,
        url: siteUrl,
        image: imageUrl,
        jobTitle,
        description: pageDescription,
        worksFor: {
          "@type": "Organization",
          name: worksForName,
        },
        homeLocation: {
          "@type": "Place",
          name: homeLocationName,
        },
        sameAs: ["https://twitter.com/IvanSmiths"],
        knowsAbout: [
          "Next.js",
          "TypeScript",
          "UX Design",
          "Web Development",
          "Frontend Architecture",
        ],
      },
      {
        "@type": "AboutPage",
        "@id": `${aboutUrl}#about`,
        url: aboutUrl,
        name: pageTitle,
        description: pageDescription,
        about: {
          "@id": `${siteUrl}/#person`,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${aboutUrl}#breadcrumbs`,
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
            name: breadcrumbAboutName,
            item: aboutUrl,
          },
        ],
      },
    ],
  };
}
