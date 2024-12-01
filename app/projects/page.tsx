import { FC } from "react";
import Header from "../crafts/components/Header";
import { worksHeaderProps } from "../crafts/components/headerProps";
import Footer from "../globalComponents/Footer/Footer";
import Navbar, { Position } from "../globalComponents/Navbar/Navbar";
import ProjectsSection from "./components/ProjectsSection";
import { Projects } from "../../utils/graphql/graphqlTypes";
import { getProjects } from "../../utils/graphql";

const ProjectPage: FC = async () => {
  const projects: Projects[] = await getProjects();

  return (
    <>
      <Header
        h1={worksHeaderProps.h1}
        h2={worksHeaderProps.h2}
        paragraph={worksHeaderProps.paragraph}
      />
      <Navbar position={Position.Fixed} />
      <ProjectsSection projects={projects} />
      <Footer />
    </>
  );
};

export default ProjectPage;
