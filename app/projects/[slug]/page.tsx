import { FC } from "react";
import { WorkProjectPage } from "../../../utils/pages/types";
import { projectSchema } from "../../../utils/seo/Schemas";
import projectsData from "../../../utils/pages/projects";
import { Metadata } from "next";
import { generatePageMetadata } from "../../../utils/seo/work-project/pageMetadata";
import PageTemplate from "../../../components/work-project/PageTemplate";
import Hero from "../../../components/work-project/Hero";
import Images from "../../../components/work-project/Images";

export type Params = Promise<{
  slug: string;
}>;

export async function generateStaticParams() {
  return (projectsData as WorkProjectPage[]).map((project) => ({
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
      renderContent={(project) => (
        <>
          <Hero work={project} />
          <Images work={project} />
        </>
      )}
    />
  );
};

export default Project;
