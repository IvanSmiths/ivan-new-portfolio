import { FC } from "react";
import { workSchema } from "../../../utils/seo/Schemas";
import Images from "../../../components/work-project/Images";
import worksData from "../../../utils/pages/works";
import { WorkProjectPage } from "../../../utils/pages/types";
import { Metadata } from "next";
import { generatePageMetadata } from "../../../utils/seo/work-project/pageMetadata";
import PageTemplate from "../../../components/work-project/PageTemplate";
import Details from "../../../components/work-project/Details/Details";

export type Params = Promise<{
  slug: string;
}>;

export async function generateStaticParams() {
  return (worksData as WorkProjectPage[]).map((work) => ({
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
      renderContent={(work) => (
        <section className="px-sm pt-xl flex">
          <Details work={work} />
          <Images work={work} />
        </section>
      )}
    />
  );
};

export default Work;
