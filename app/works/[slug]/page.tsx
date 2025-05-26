import { FC } from "react";
import Images from "../../../components/work-project/Images";
import worksData from "../../../utils/data/works";
import { WorkProjectPage } from "../../../utils/data/types";
import { Metadata } from "next";
import { generatePageMetadata } from "../../../utils/seo/work-project/pageMetadata";
import PageTemplate from "../../../components/work-project/PageTemplate";
import Details from "../../../components/work-project/Details/Details";
import { pageSchema } from "../../../utils/seo/work-project/pageSchema";
import { notFound } from "next/navigation";

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
  const entry = worksData.find((work) => work.slug === slug);
  if (!entry) {
    return {
      title: "Work Not Found",
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
