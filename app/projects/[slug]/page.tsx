import { getProjectsPage } from "../../../utils/graphql";
import { ProjectPage } from "../../../utils/graphql/graphqlTypes";
import Navbar, { Position } from "../../globalComponents/Navbar/Navbar";
import Footer from "../../globalComponents/Footer/Footer";
import Hero from "../../components/project/Hero";
import Images from "../../components/project/Images";
import { projectSchema } from "../../../utils/metadata/Schemas";
import { generateMetadata } from "../../../utils/metadata/projectMetadata";

export type Props = {
  params: { slug: string };
};

export { generateMetadata };

const Project = async ({ params }: Props) => {
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
