import { Metadata } from "../getPosts";
import { description, keywords } from "./homeMetadata";

type WorkProps = {
  slug: string;
  company: string;
};

type BlogSchema = Metadata & { slug?: string };

export const homeSchema = {
  "@context": "http://schema.org",
  "@type": "WebSite",
  name: "IvanSmiths",
  url: "https://www.ivansmiths.com",
  image: "https://www.ivansmiths.com/home.png",
  description,
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
  headline: "Fullstack developer specialized in design and user experience.",
  keywords,
  locationCreated: "Wiesbaden",
};

export const worksSchema = {
  "@context": "http://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://ivansmiths.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Works",
      item: "https://ivansmiths.com/works",
    },
  ],
};

export const projectsSchema = {
  "@context": "http://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://ivansmiths.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Works",
      item: "https://ivansmiths.com/projects",
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
        name: "Home",
        item: "https://ivansmiths.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Works",
        item: "https://ivansmiths.com/works",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: works.company,
        item: `https://ivansmiths.com/works/${works.slug}`,
      },
    ],
  };
};

export const blogsSchema = {
  "@context": "http://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://ivansmiths.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blogs",
      item: "https://ivansmiths.com/blog",
    },
  ],
};

export const blogSchema = (post: BlogSchema) => {
  return [
    {
      "@context": "http://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://ivansmiths.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: "https://ivansmiths.com/blog",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: post.title,
          item: `https://ivansmiths.com/blog/${post.slug}`,
        },
      ],
    },
    {
      "@context": "http://schema.org",
      "@type": "Blog",
      "@id": "https://ivansmiths.com/blog/",
      mainEntityOfPage: "https://ivansmiths.com/blog",
      name: "Ivan Smiths's Blog",
      description: "Blog about React, Next.js and other frontend technologies",
      publisher: {
        "@type": "Person",
        "@id": "https://ivansmiths.com",
        name: "Ivan Smiths",
      },
    },
    {
      "@context": "http://schema.org",
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
        "@id": "https://ivansmiths.com/",
        url: "https://ivansmiths.com/",
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
      keywords: post.tags,
    },
  ];
};

export const craftsSchema = {
  "@context": "http://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://ivansmiths.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Crafts",
      item: "https://ivansmiths.com/crafts",
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
      item: "https://ivansmiths.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Crafts",
      item: "https://ivansmiths.com/crafts",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Renders",
      item: "https://ivansmiths.com/renders",
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
      item: "https://ivansmiths.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Crafts",
      item: "https://ivansmiths.com/crafts",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Photos",
      item: "https://ivansmiths.com/photos",
    },
  ],
};
