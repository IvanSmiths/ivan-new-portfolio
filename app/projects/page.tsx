import type { Metadata } from "next";
import { FC } from "react";
import Header from "../../components/global/header/Header";
import { projectsHeaderProps } from "../../components/global/header/headerProps";
import Navbar, { Position } from "../../components/global/Navbar/Navbar";
import { projectsSchema } from "../../utils/seo/Schemas";
import Footer from "../../components/global/Footer/Footer";
import projectsData from "../../utils/pages/projects";
import { pagesMetadata } from "../../utils/seo/work-project/pagesMetadata";
import WorksSection from "../../components/works-projects/WorksSection";

const title: string =
  "Ivan Smiths - Portfolio of Fullstack and UI/UX Development Projects";
const description: string =
  "Here I share all the new projects that are at least in a beta stage.";
const path = "/projects";

export const metadata: Metadata = pagesMetadata(title, description, path);

const ProjectsPage: FC = () => {
  return (
    <>
      <Header
        h1={projectsHeaderProps.h1}
        h2={projectsHeaderProps.h2}
        paragraph={projectsHeaderProps.paragraph}
      />
      <Navbar position={Position.Fixed} />
      <WorksSection works={projectsData} />
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsSchema) }}
      />
    </>
  );
};

export default ProjectsPage;
