import { workSchema } from "../../../utils/metadata/Schemas";
import { generateMetadata } from "../../../utils/metadata/workMetadata";
import Navbar, { Position } from "../../components/global/Navbar/Navbar";
import Hero from "../../components/work/Hero";
import Images from "../../components/work/Images";
import WorksDone from "../../components/work/WorksDone";
import { WorkPage } from "../../../utils/graphql/graphqlTypes";
import { getWorksPage } from "../../../utils/graphql";
import Footer from "../../components/global/Footer/Footer";

export type Props = {
  params: { slug: string };
};

export { generateMetadata };

export default async function Work({ params }: Props) {
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
}
