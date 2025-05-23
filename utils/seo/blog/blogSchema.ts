import { baseUrl } from "../../../_config/config";
import { Metadata } from "../../fetch/getPosts";

type BlogSchema = Metadata & { slug?: string };

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
          item: baseUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: `${baseUrl}/blog`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: post.title,
          item: `${baseUrl}/blog/${post.slug}`,
        },
      ],
    },
    {
      "@context": "http://schema.org",
      "@type": "Blog",
      "@id": `${baseUrl}/blog/`,
      mainEntityOfPage: `${baseUrl}/blog`,
      name: "Ivan Smiths's Blog",
      description: "Blog about React, Next.js and other frontend technologies",
      publisher: {
        "@type": "Person",
        "@id": baseUrl,
        name: "Ivan Smiths",
      },
    },
    {
      "@context": "http://schema.org",
      "@type": "BlogPosting",
      "@id": `${baseUrl}/blog/${post.slug}/#BlogPosting`,
      mainEntityOfPage: `${baseUrl}/blog/${post.slug}`,
      headline: post.title,
      name: post.title,
      description: post.excerpt,
      datePublished: post.date,
      dateModified: post.date,
      author: {
        "@type": "Person",
        "@id": baseUrl,
        url: baseUrl,
        name: "Ivan Smiths",
      },
      image: {
        "@type": "ImageObject",
        url: `${baseUrl}/${post.cover}`,
        height: post.coverHeight,
        width: post.coverWidth,
      },
      url: `${baseUrl}/blog/${post.slug}`,
      keywords: post.tags,
    },
  ];
};
