type HomeStructuredDataParams = {
  siteUrl: string;
  siteName: string;
  imageUrl: string;
  jobTitle: string;
  websiteDescription: string;
  portfolioDescription: string;
  language: string;
};

export function createHomeStructuredData({
  siteUrl,
  siteName,
  imageUrl,
  jobTitle,
  websiteDescription,
  portfolioDescription,
  language,
}: HomeStructuredDataParams) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: siteName,
        url: siteUrl,
        jobTitle,
        image: imageUrl,
        sameAs: ["https://twitter.com/IvanSmiths"],
        knowsAbout: [
          "React",
          "Vue",
          "TypeScript",
          "UX Design",
          "Frontend Development",
          "Web Performance",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: `${siteName} Portfolio`,
        description: websiteDescription,
        publisher: {
          "@id": `${siteUrl}/#person`,
        },
      },
      {
        "@type": "CreativeWork",
        "@id": `${siteUrl}/#portfolio`,
        name: `${siteName} Portfolio`,
        creator: {
          "@id": `${siteUrl}/#person`,
        },
        url: siteUrl,
        description: portfolioDescription,
        inLanguage: language,
      },
    ],
  };
}
