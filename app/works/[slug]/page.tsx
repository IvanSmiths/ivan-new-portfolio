import { workSchema } from "../../../utils/metadata/Schemas";
import { generateMetadata } from "../../../utils/metadata/workMetadata";
import Navbar, { Position } from "../../components/global/Navbar/Navbar";
import Hero from "../../components/work/Hero";
import Images from "../../components/work/Images";
import WorksDone from "../../components/work/WorksDone";
import { WorkPage } from "../../../utils/fetch/graphql/graphqlTypes";
import { getWorksPage } from "../../../utils/fetch/graphql";
import Footer from "../../components/global/Footer/Footer";
import { FC } from "react";

export type Props = {
  params: { slug: string };
};

export { generateMetadata };

const Work: FC<Props> = async ({ params }) => {
  try {
    const works: WorkPage = await getWorksPage(params.slug);
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
  } catch (error) {
    console.error("Failed to fetch work page.");
    return (
      <>
        <Navbar position={Position.Fixed} />
        <Footer />
      </>
    );
  }
};

export default Work;
