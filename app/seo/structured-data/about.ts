type AboutStructuredDataParams = {
  siteUrl: string;
  siteName: string;
  pageTitle: string;
  pageDescription: string;
  imageUrl: string;
};

export function createAboutStructuredData({
  siteUrl,
  siteName,
  pageTitle,
  pageDescription,
  imageUrl,
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
        jobTitle: "Full-Stack Developer",
        description: pageDescription,
        worksFor: {
          "@type": "Organization",
          name: "Freelance",
        },
        homeLocation: {
          "@type": "Place",
          name: "Germany",
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
            name: "Home",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "About",
            item: aboutUrl,
          },
        ],
      },
    ],
  };
}

