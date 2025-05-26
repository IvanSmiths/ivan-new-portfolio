import { Metadata } from "next";
import { baseUrl } from "@arcjet/env";
import { siteName } from "../../../_config/config";
import { PostMetadata } from "../../fetch/posts/types";

export const generatePostMetadata = (data: PostMetadata) => {
  const slug = data.title.toLowerCase().replace(/ /g, "-");

  const title = data.title ?? "Untitled";
  const description = data.description ?? "No description available";
  const publishedTime = data.publishedAt ?? Date.now().toString();
  const image = data.cover ?? "";
  const category = data.category ?? "Post";

  const postsDir = "blog";
  const fullUrl = `${baseUrl}/${postsDir}/${slug}`;
  const urlUntilPostPage = `${baseUrl}/${postsDir}`;

  const postMetadata: Metadata = {
    title,
    description,
    openGraph: {
      type: "article",
      title,
      description,
      publishedTime,
      images: [
        {
          url: image,
        },
      ],
      siteName,
      modifiedTime: publishedTime,
      authors: [siteName],
      tags: [category],
      url: `${fullUrl}`,
    },
    twitter: {
      title,
      description,
      card: "summary_large_image",
      creator: "@PikaPrimeX",
    },
  };

  const postSchema = [
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
          item: `${urlUntilPostPage}`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: title,
          item: `${fullUrl}`,
        },
      ],
    },
    {
      "@context": "http://schema.org",
      "@type": "Article",
      headline: title,
      datePublished: publishedTime,
      dateModified: publishedTime,
      author: {
        "@type": "Person",
        name: "Ivan Smiths",
        url: "https://ivansmiths.com/",
      },
      image: [image],
    },
  ];

  return { postMetadata, postSchema };
};
