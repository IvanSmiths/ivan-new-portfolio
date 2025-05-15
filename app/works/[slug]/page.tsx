import { workSchema } from "../../../utils/metadata/Schemas";
import { generateMetadata } from "../../../utils/metadata/workMetadata";
import Navbar, { Position } from "../../../components/global/Navbar/Navbar";
import Hero from "../../../components/work/Hero";
import Images from "../../../components/work/Images";
import WorksDone from "../../../components/work/WorksDone";
import Footer from "../../../components/global/Footer/Footer";
import { FC } from "react";
import worksData from "../../../utils/pages/works/works";
import { WorkPage } from "../../../utils/pages/types";
import { notFound } from "next/navigation";

export type Props = {
  params: { slug: string };
};

export { generateMetadata };

const Work: FC<Props> = ({ params }) => {
  const works: WorkPage | undefined = worksData.find(
    (work) => work.slug === params.slug,
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
