import { Metadata } from "next";

interface PageData {
  slug: string;
  title: string;
  metaDescription: string;
  homeImage: {
    url: string;
    width: number;
    height: number;
  };

  [key: string]: any;
}

export function generatePageMetadata<T extends PageData>(
  slug: string,
  data: T[],
  itemKey: string,
  notFoundTitle: string,
): Metadata {
  const item = data.find((i) => i.slug === slug);

  if (!item) {
    return {
      title: notFoundTitle,
      description: `The requested ${itemKey} could not be found.`,
    };
  }

  const ogImage = [
    {
      url: item.homeImage.url,
      width: item.homeImage.width,
      height: item.homeImage.height,
      alt: item[itemKey],
    },
  ];

  return {
    title: item.title,
    description: item.metaDescription,
    openGraph: {
      title: item.title,
      type: "website",
      description: item.metaDescription,
      images: ogImage,
    },
    twitter: {
      card: "summary_large_image",
      title: item.title,
      creator: "@Ivansmiths",
      creatorId: "1303746727594405894",
      description: item.metaDescription,
      images: ogImage,
    },
  };
}
