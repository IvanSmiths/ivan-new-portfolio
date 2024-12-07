import { getProjects } from "../../utils/graphql";
import Header from "../crafts/components/Header";
import { projectsHeaderProps } from "../crafts/components/headerProps";
import Navbar, { Position } from "../globalComponents/Navbar/Navbar";
import Footer from "../globalComponents/Footer/Footer";
import { projectsSchema } from "../../utils/metadata/Schemas";
import ProjectsSection from "./components/ProjectsSection";
import { ProjectBase } from "../../utils/graphql/graphqlTypes";

export default async function Page() {
  const projects: ProjectBase[] = await getProjects();
  return (
    <>
      <Header
        h1={projectsHeaderProps.h1}
        h2={projectsHeaderProps.h2}
        paragraph={projectsHeaderProps.paragraph}
      />
      <Navbar position={Position.Fixed} />
      <ProjectsSection projects={projects} />
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsSchema) }}
      />
    </>
  );
}
