import { getProjects } from "../../utils/graphql";
import Header from "../components/crafts/Header";
import { projectsHeaderProps } from "../components/crafts/headerProps";
import Navbar, { Position } from "../globalComponents/Navbar/Navbar";
import Footer from "../globalComponents/Footer/Footer";
import { projectsSchema } from "../../utils/metadata/Schemas";
import ProjectsSection from "../components/projects/ProjectsSection";
import { ProjectBase } from "../../utils/graphql/graphqlTypes";
import type { Metadata } from "next";
import { projectsMetadata } from "../../utils/metadata/projectsMetadata";

export const metadata: Metadata = projectsMetadata;

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
