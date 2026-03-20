type HomeStructuredDataParams = {
  siteUrl: string;
  siteName: string;
  imageUrl: string;
};

export function createHomeStructuredData({ siteUrl, siteName, imageUrl }: HomeStructuredDataParams) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: siteName,
        url: siteUrl,
        jobTitle: "Full-Stack Developer",
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
        description: `Portfolio of ${siteName}, Full-Stack Developer specializing in Next.js and UX.`,
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
        description:
          "A collection of projects showcasing full-stack development and UX expertise.",
        inLanguage: "en",
      },
    ],
  };
}

