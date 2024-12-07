import { getProjectsPage } from "../../../utils/graphql";
import { ProjectPage } from "../../../utils/graphql/graphqlTypes";
import Navbar, { Position } from "../../globalComponents/Navbar/Navbar";
import Footer from "../../globalComponents/Footer/Footer";
import Hero from "./components/Hero";
import Images from "./components/Images";
import { projectSchema } from "../../../utils/metadata/Schemas";
import { generateMetadata } from "../../../utils/metadata/projectMetadata";

export type Props = {
  params: Promise<{ slug: string }>;
};

export { generateMetadata };

const Project = async (props: Props) => {
  const params = await props.params;
  const projects: ProjectPage = await getProjectsPage(params.slug);

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
};

export default Project;
