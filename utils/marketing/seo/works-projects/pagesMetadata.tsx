import { Metadata } from "next";
import { baseUrl, siteName, twitter } from "../../../../_config/config";

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
  const { type = "website" } = options;
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
      creator: twitter.twitterCreator,
      creatorId: twitter.twitterCreatorId,
    },
  };
}
