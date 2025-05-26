import type { Metadata } from "next";
import { pagesSchema } from "../../utils/seo/works-projects/pagesSchemas";
import projectsData from "../../utils/data/projects";
import { pagesMetadata } from "../../utils/seo/works-projects/pagesMetadata";
import TemplateSection from "../../components/works-projects/TemplateSection";
import {
  description,
  path,
  title,
} from "../../utils/seo/works-projects/projectsMetadata";

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
