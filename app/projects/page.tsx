import type { Metadata } from "next";
import { FC } from "react";
import Header from "../../components/crafts/Header";
import { projectsHeaderProps } from "../../components/crafts/headerProps";
import Navbar, { Position } from "../../components/global/Navbar/Navbar";
import { projectsSchema } from "../../utils/metadata/Schemas";
import ProjectsSection from "../../components/projects/ProjectsSection";
import { projectsMetadata } from "../../utils/metadata/projectsMetadata";
import Footer from "../../components/global/Footer/Footer";
import projectsData from "../../utils/pages/projects/projects";

export const metadata: Metadata = projectsMetadata;

const ProjectsPage: FC = () => {
  return (
    <>
      <Header
        h1={projectsHeaderProps.h1}
        h2={projectsHeaderProps.h2}
        paragraph={projectsHeaderProps.paragraph}
      />
      <Navbar position={Position.Fixed} />
      <ProjectsSection projects={projectsData} />
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsSchema) }}
      />
    </>
  );
};

export default ProjectsPage;
