import type { Metadata } from "next";
import TemplateSection from "../../components/works-projects/TemplateSection";
import worksData from "../../utils/data/works";
import { pagesMetadata } from "../../utils/seo/works-projects/pagesMetadata";
import { pagesSchema } from "../../utils/seo/works-projects/pagesSchemas";
import {
  description,
  path,
  title,
} from "../../utils/seo/works-projects/worksMetadata";

export const metadata: Metadata = pagesMetadata(title, description, path);

const WorksPage = () => {
  return (
    <>
      <TemplateSection path={path} works={worksData} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pagesSchema(path)),
        }}
      />
    </>
  );
};

export default WorksPage;
