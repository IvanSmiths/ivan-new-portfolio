import { getProjects } from "../../utils/fetch/graphql";
import Header from "../components/crafts/Header";
import { projectsHeaderProps } from "../components/crafts/headerProps";
import Navbar, { Position } from "../components/global/Navbar/Navbar";
import { projectsSchema } from "../../utils/metadata/Schemas";
import ProjectsSection from "../components/projects/ProjectsSection";
import { ProjectBase } from "../../utils/fetch/graphql/graphqlTypes";
import type { Metadata } from "next";
import { projectsMetadata } from "../../utils/metadata/projectsMetadata";
import Footer from "../components/global/Footer/Footer";
import { FC, ReactNode } from "react";

export const metadata: Metadata = projectsMetadata;

type ProjectsLayoutProps = {
  children?: ReactNode;
};

const ProjectsLayout: FC<ProjectsLayoutProps> = ({ children }) => (
  <>
    <Header
      h1={projectsHeaderProps.h1}
      h2={projectsHeaderProps.h2}
      paragraph={projectsHeaderProps.paragraph}
    />
    <Navbar position={Position.Fixed} />
    {children}
    <Footer />
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsSchema) }}
    />
  </>
);

const ProjectsPage: FC = async () => {
  try {
    const projects: ProjectBase[] = await getProjects();
    return (
      <ProjectsLayout>
        {projects && <ProjectsSection projects={projects} />}
      </ProjectsLayout>
    );
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return <ProjectsLayout />;
  }
};

export default ProjectsPage;
