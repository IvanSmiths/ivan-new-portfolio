import { projectSchema } from "../../../utils/metadata/Schemas";
import Footer from "../../globalComponents/Footer/Footer";
import Navbar, { Position } from "../../globalComponents/Navbar/Navbar";
import Hero from "./components/Hero";
import Images from "./components/Images";
import { ProjectPage } from "../../../utils/graphql/graphqlTypes";
import { getProjectsPage } from "../../../utils/graphql";

export type Props = {
  params: { slug: string };
};

export default async function Project({ params }: Props) {
  const projects: ProjectPage = await getProjectsPage(params.slug);

  console.log(params.slug);

  return (
    <>
      <Navbar position={Position.Fixed} />
      <Hero project={projects} />
      <Images project={projects} />
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectSchema(projects)),
        }}
      />
    </>
  );
}
