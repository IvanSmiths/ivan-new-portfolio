import { FC } from "react";
import { notFound } from "next/navigation";
import { workSchema } from "../../../utils/seo/Schemas";
import Navbar, { Position } from "../../../components/global/Navbar/Navbar";
import Hero from "../../../components/work/Hero";
import Images from "../../../components/work/Images";
import WorksDone from "../../../components/work/WorksDone";
import Footer from "../../../components/global/Footer/Footer";
import worksData from "../../../utils/pages/works/works";
import { WorkPage } from "../../../utils/pages/types";
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
  return generatePageMetadata(slug, worksData, "project", "Project Not Found");
}

const Work: FC<{ params: Params }> = async ({ params }) => {
  const { slug } = await params;

  const works: WorkPage | undefined = worksData.find(
    (work) => work.slug === slug,
  );

  if (!works) {
    notFound();
  }

  return (
    <>
      <Navbar position={Position.Fixed} />
      <Hero work={works} />
      <WorksDone works={works.worksDone.works} />
      <Images work={works} />
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(workSchema(works)),
        }}
      />
    </>
  );
};

export default Work;
