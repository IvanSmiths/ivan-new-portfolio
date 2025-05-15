import { Metadata } from "next";
import { Props } from "../../app/works/[slug]/page";
import { WorkPage } from "../pages/types";
import worksData from "../pages/works/works";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const work: WorkPage | undefined = worksData.find(
    (w) => w.slug === params.slug
  );

  if (!work) {
    return {
      title: "Work Not Found",
      description: "The requested work could not be found.",
    };
  }

  const ogImage = [
    {
      url: work.homeImage.url,
      width: work.homeImage.width,
      height: work.homeImage.height,
      alt: work.company,
    },
  ];

  return {
    title: work.title,
    description: work.metaDescription,
    openGraph: {
      title: work.title,
      type: "website",
      description: work.metaDescription,
      images: ogImage,
    },
    twitter: {
      card: "summary_large_image",
      title: work.title,
      creator: "@Ivansmiths",
      creatorId: "1303746727594405894",
      description: work.metaDescription,
      images: ogImage,
    },
  };
}
