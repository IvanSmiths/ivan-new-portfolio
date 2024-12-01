import type { Metadata } from "next";
import { FC } from "react";
import { getProjects } from "../../utils/graphql";
import { worksSchema } from "../../utils/metadata/Schemas";
import { worksMetadata } from "../../utils/metadata/worksMetadata";
import Header from "../crafts/components/Header";
import { projectsHeaderProps } from "../crafts/components/headerProps";
import Footer from "../globalComponents/Footer/Footer";
import Navbar, { Position } from "../globalComponents/Navbar/Navbar";
import ProjectsSection from "./components/ProjectsSection";
import { Projects } from "../../utils/graphql/graphqlTypes";

export const metadata: Metadata = worksMetadata;

const ProjectsPage: FC = async () => {
  const projects: Projects[] = await getProjects();

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(worksSchema) }}
      />
    </>
  );
};

export default ProjectsPage;
