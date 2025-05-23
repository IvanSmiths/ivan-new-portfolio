import type { Metadata } from "next";
import { pagesSchema } from "../../utils/seo/works-projects/pagesSchemas";
import projectsData from "../../utils/pages/projects";
import { pagesMetadata } from "../../utils/seo/works-projects/pagesMetadata";
import TemplateSection from "../../components/works-projects/TemplateSection";

const title: string =
  "Ivan Smiths - Portfolio of Fullstack and UI/UX Development Projects";
const description: string =
  "Here I share all the new projects that are at least in a beta stage.";
const path = "/projects";

export const metadata: Metadata = pagesMetadata(title, description, path);

const ProjectsPage = () => {
  return (
    <>
      <TemplateSection works={projectsData} path={path} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pagesSchema(path)),
        }}
      />
    </>
  );
};

export default ProjectsPage;
