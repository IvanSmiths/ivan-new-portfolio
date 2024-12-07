import { workSchema } from "../../../utils/metadata/Schemas";
import { generateMetadata } from "../../../utils/metadata/workMetadata";
import Footer from "../../globalComponents/Footer/Footer";
import Navbar, { Position } from "../../globalComponents/Navbar/Navbar";
import Hero from "./components/Hero";
import Images from "./components/Images";
import WorksDone from "./components/WorksDone";
import { WorkPage } from "../../../utils/graphql/graphqlTypes";
import { getWorksPage } from "../../../utils/graphql";

export type Props = {
  params: Promise<{ slug: string }>;
};

export { generateMetadata };

export default async function Work(props: Props) {
  const params = await props.params;
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
