type WorkProps = {
  slug: string;
  title: string;
};

type BlogProps = {
  slug: string | undefined;
  title: string;
  excerpt: string;
  date: string;
  cover?: string | undefined;
  coverWidth?: number | undefined;
  coverHeight?: number | undefined;
  tags: string;
};

export const homeSchema = {
  "@context": "http://schema.org",
  "@type": "WebSite",
  name: "IvanSmiths",
  url: "https://www.ivansmiths.com",
  image: "https://www.ivansmiths.com/home.png",
  description: "Frontend developer with 3 years of experience",
  sameAs: "https://www.ivansmiths.com",
  author: {
    "@type": "Person",
    name: "Ivan",
    familyName: "Smiths",
    url: "https://www.ivansmiths.com",
  },
  inLanguage: "en",
  copyrightYear: 2020,
  genre: "http://vocab.getty.edu/aat/300179434",
  headline: "Seeking the limit.",
  keywords: "next.js, ui/ux developer, wiesbaden, react.js, frontend developer",
  locationCreated: "Wiesbaden",
};

export const worksSchema = {
  "@context": "http://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Ivan Smiths, Frontend UI/UX Developer from Wiesbaden",
      item: "https://ivansmiths.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Ivan Smiths, all the works",
      item: "https://ivansmiths.com/works",
    },
  ],
};

export const workSchema = (works: WorkProps) => {
  return {
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Ivan Smiths, Frontend UI/UX Developer from Wiesbaden",
        item: "https://ivansmiths.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Ivan Smiths, all the works",
        item: "https://ivansmiths.com/works",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: works.title,
        item: `https://ivansmiths.com/works/${works.slug}`,
      },
    ],
  };
};

export const blogSchema = (post: BlogProps) => {
  const tags: string[] = post.tags.split(" ");
  return [
    {
      "@type": "BlogPosting",
      "@id": `https://ivansmiths.com/blog/${post.slug}/#BlogPosting`,
      mainEntityOfPage: `https://ivansmiths.com/blog/${post.slug}`,
      headline: post.title,
      name: post.title,
      description: post.excerpt,
      datePublished: post.date,
      dateModified: post.date,
      author: {
        "@type": "Person",
        "@id": "https://ivansmiths.com/#Person",
        name: "Ivan Smiths",
      },
      image: {
        "@type": "ImageObject",
        "@id": `https://ivansmiths.com${post.cover}/#BlogPosting`,
        url: `https://ivansmiths.com${post.cover}`,
        height: post.coverHeight,
        width: post.coverWidth,
      },
      url: `https://ivansmiths.com/blog/${post.slug}`,
      keywords: tags,
    },
  ];
};
