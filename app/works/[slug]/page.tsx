import { getWorksPage, WorkPage } from "../../../utils/graphql";
import { workSchema } from "../../../utils/metadata/Schemas";
import { generateMetadata } from "../../../utils/metadata/workMetadata";
import Footer from "../../globalComponents/Footer/Footer";
import Navbar, { Position } from "../../globalComponents/Navbar/Navbar";
import Description from "./components/Description";
import Hero from "./components/Hero";
import Images from "./components/Images";
import WorksDone from "./components/WorksDone";

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
      <WorksDone />
      <Description work={works} />
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
