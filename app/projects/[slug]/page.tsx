import { FC } from "react";
import { notFound } from "next/navigation";
import { ProjectPage } from "../../../utils/pages/types";
import Navbar, { Position } from "../../../components/global/Navbar/Navbar";
import Hero from "../../../components/project/Hero";
import Images from "../../../components/project/Images";
import { projectSchema } from "../../../utils/seo/Schemas";
import Footer from "../../../components/global/Footer/Footer";
import projectsData from "../../../utils/pages/projects/projects";
import { Metadata } from "next";
import { generatePageMetadata } from "../../../utils/seo/work-project/pageMetadata";

export type Params = Promise<{
  slug: string;
}>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  return generatePageMetadata(
    slug,
    projectsData,
    "project",
    "Project Not Found",
  );
}

const Project: FC<{ params: Params }> = async ({ params }) => {
  const { slug } = await params;

  const project = (projectsData as ProjectPage[]).find(
    (proj) => proj.slug === slug,
  );

  if (!project) {
    notFound();
  }

  return (
    <>
      <Navbar position={Position.Fixed} />
      <Hero project={project} />
      <Images project={project} />
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectSchema(project)),
        }}
      />
    </>
  );
};

export default Project;
