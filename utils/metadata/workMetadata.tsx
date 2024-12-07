import { Metadata } from "next";
import { Props } from "../../app/works/[slug]/page";
import { WorkPage } from "../graphql/graphqlTypes";
import { getWorksPage } from "../graphql";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const work: WorkPage = await getWorksPage(params.slug);
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
