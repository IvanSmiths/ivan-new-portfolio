import { Metadata } from "next";
import { Props } from "../../app/projects/[slug]/page";
import { ProjectPage } from "../graphql/graphqlTypes";
import { getProjectsPage } from "../graphql";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project: ProjectPage = await getProjectsPage((await params).slug);
  const ogImage = [
    {
      url: project.homeImage.url,
      width: project.homeImage.width,
      height: project.homeImage.height,
      alt: project.project,
    },
  ];
  return {
    title: project.title,
    description: project.metaDescription,
    openGraph: {
      title: project.title,
      type: "website",
      description: project.metaDescription,
      images: ogImage,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      creator: "@Ivansmiths",
      creatorId: "1303746727594405894",
      description: project.metaDescription,
      images: ogImage,
    },
  };
}
