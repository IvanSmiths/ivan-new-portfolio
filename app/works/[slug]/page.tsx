import { FC } from "react";
import { workSchema } from "../../../utils/seo/Schemas";
import Hero from "../../../components/work-project/Hero";
import Images from "../../../components/work-project/Images";
import WorksDone from "../../../components/work-project/WorksDone";
import worksData from "../../../utils/pages/works";
import { WorkPage } from "../../../utils/pages/types";
import { Metadata } from "next";
import { generatePageMetadata } from "../../../utils/seo/work-project/pageMetadata";
import PageTemplate from "../../../components/work-project/PageTemplate";

export type Params = Promise<{
  slug: string;
}>;

export async function generateStaticParams() {
  return (worksData as WorkPage[]).map((work) => ({
    slug: work.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  return generatePageMetadata(slug, worksData, "project", "Project Not Found");
}

const Work: FC<{ params: Params }> = async ({ params }) => {
  const { slug } = await params;

  return (
    <PageTemplate
      slug={slug}
      data={worksData}
      schemaFn={workSchema}
      renderContent={(work: WorkPage) => (
        <>
          <Hero work={work} />
          <WorksDone works={work.worksDone.works} />
          <Images work={work} />
        </>
      )}
    />
  );
};

export default Work;
