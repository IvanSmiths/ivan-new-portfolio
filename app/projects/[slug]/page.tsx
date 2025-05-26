import { FC } from "react";
import { WorkProjectPage } from "../../../utils/data/types";
import projectsData from "../../../utils/data/projects";
import { Metadata } from "next";
import { generatePageMetadata } from "../../../utils/seo/work-project/pageMetadata";
import PageTemplate from "../../../components/work-project/PageTemplate";
import Images from "../../../components/work-project/Images";
import Details from "../../../components/work-project/Details/Details";
import { notFound } from "next/navigation";
import { pageSchema } from "../../../utils/seo/work-project/pageSchema";

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
  const entry = projectsData.find((project) => project.slug === slug);

  if (!entry) {
    return {
      title: "Project Not Found",
    };
  }

  return generatePageMetadata(
    entry.slug,
    projectsData,
    "project",
    "Project Not Found",
  );
}

const Project: FC<{ params: Params }> = async ({ params }) => {
  const { slug } = await params;
  const entry = projectsData.find((project) => project.slug === slug);

  if (!entry) {
    notFound();
  }

  return (
    <PageTemplate
      entry={entry}
      schema={pageSchema(entry, "projects")}
      renderContent={(project) => (
        <>
          <Details work={project} />
          <Images work={project} />
        </>
      )}
    />
  );
};

export default Project;
