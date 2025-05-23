import type { Metadata } from "next";
import TemplateSection from "../../components/works-projects/TemplateSection";
import worksData from "../../utils/pages/works";
import { pagesMetadata } from "../../utils/seo/works-projects/pagesMetadata";
import { pagesSchema } from "../../utils/seo/works-projects/pagesSchemas";

const title: string =
  "Ivan Smiths - Portfolio of Fullstack and UI/UX Development Works";
const description: string =
  "Discover a diverse range of projects in UI/UX and Fullstack Development. Explore award-winning websites, high-traffic landing pages, and innovative e-commerce platforms crafted for clients like Deutsche Bahn, R+V, Adidas, and WMF.";
const path = "/works";

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
