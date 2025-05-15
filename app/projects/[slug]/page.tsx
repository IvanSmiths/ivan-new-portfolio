import { FC } from "react";
import { ProjectPage } from "../../../utils/pages/types";
import Hero from "../../../components/project/Hero";
import Images from "../../../components/project/Images";
import { projectSchema } from "../../../utils/seo/Schemas";
import projectsData from "../../../utils/pages/projects/projects";
import { Metadata } from "next";
import { generatePageMetadata } from "../../../utils/seo/work-project/pageMetadata";
import PageTemplate from "../../../components/work-project/PageTemplate";

export type Params = Promise<{
  slug: string;
}>;

export async function generateStaticParams() {
  return (projectsData as ProjectPage[]).map((project) => ({
    slug: project.slug,
  }));
}

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

  return (
    <PageTemplate
      slug={slug}
      data={projectsData}
      schemaFn={projectSchema}
      renderContent={(project: ProjectPage) => (
        <>
          <Hero project={project} />
          <Images project={project} />
        </>
      )}
    />
  );
};

export default Project;
