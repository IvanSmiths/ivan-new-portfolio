import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { FC } from "react";
import Details from "../../../components/work-project/Details/Details";
import Images from "../../../components/work-project/Images";
import PageTemplate from "../../../components/work-project/PageTemplate";
import type { WorkProjectPage } from "../../../utils/data/types";
import worksData from "../../../utils/data/works";
import { generatePageMetadata } from "../../../utils/marketing/seo/work-project/pageMetadata";
import { pageSchema } from "../../../utils/marketing/seo/work-project/pageSchema";

export type Params = Promise<{
  slug: string;
}>;

export async function generateStaticParams() {
  return (worksData as WorkProjectPage[]).map((work) => ({
    slug: work.slug
  }));
}

export async function generateMetadata({
                                         params
                                       }: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = worksData.find((work) => work.slug === slug);
  if (!entry) {
    return {
      title: "Work Not Found"
    };
  }

  return generatePageMetadata(entry.slug, worksData, "work", "Work Not Found");
}

const Work: FC<{ params: Params }> = async ({ params }) => {
  const { slug } = await params;
  const entry = worksData.find((work) => work.slug === slug);

  if (!entry) {
    notFound();
  }

  return (
    <PageTemplate
      entry={entry}
      schema={pageSchema(entry, "works")}
      renderContent={(work) => (
        <>
          <Details work={work} />
          <Images work={work} />
        </>
      )}
    />
  );
};

export default Work;
