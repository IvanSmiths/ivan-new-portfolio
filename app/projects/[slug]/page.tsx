import { getProjectsPage } from "../../../utils/fetch/graphql";
import { ProjectPage } from "../../../utils/fetch/graphql/graphqlTypes";
import Navbar, { Position } from "../../components/global/Navbar/Navbar";
import Hero from "../../components/project/Hero";
import Images from "../../components/project/Images";
import { projectSchema } from "../../../utils/metadata/Schemas";
import { generateMetadata } from "../../../utils/metadata/projectMetadata";
import Footer from "../../components/global/Footer/Footer";

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
