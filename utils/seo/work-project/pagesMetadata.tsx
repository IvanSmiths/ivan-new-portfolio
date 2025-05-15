import { Metadata } from "next";

export function pagesMetadata(
  title: string,
  description: string,
  path: string,
  options: {
    siteName?: string;
    twitterCreator?: string;
    twitterCreatorId?: string;
    type?: "website" | "article" | "profile";
    baseUrl?: string;
  } = {},
): Metadata {
  const {
    siteName = "Ivan Smiths",
    twitterCreator = "@Ivansmiths",
    twitterCreatorId = "1303746727594405894",
    type = "website",
    baseUrl = "https://ivansmiths.com",
  } = options;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type,
      siteName,
      url: `${baseUrl}/${path}`,
    },
    twitter: {
      title,
      description,
      card: "summary_large_image",
      creator: twitterCreator,
      creatorId: twitterCreatorId,
    },
  };
}
