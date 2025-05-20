import type { Metadata } from "next";
import { FC } from "react";
import { worksSchema } from "../../utils/seo/Schemas";
import Header from "../../components/global/header/Header";
import { worksHeaderProps } from "../../components/global/header/headerProps";
import TemplateSection from "../../components/works-projects/TemplateSection";
import worksData from "../../utils/pages/works";
import { pagesMetadata } from "../../utils/seo/work-project/pagesMetadata";

const title: string =
  "Ivan Smiths - Portfolio of Fullstack and UI/UX Development Works";
const description: string =
  "Discover a diverse range of projects in UI/UX and Fullstack Development. Explore award-winning websites, high-traffic landing pages, and innovative e-commerce platforms crafted for clients like Deutsche Bahn, R+V, Adidas, and WMF.";
const path = "/works";

export const metadata: Metadata = pagesMetadata(title, description, path);

const WorksPage: FC = () => {
  return (
    <>
      <Header
        h1={worksHeaderProps.h1}
        h2={worksHeaderProps.h2}
        paragraph={worksHeaderProps.paragraph}
      />
      <TemplateSection path={path} works={worksData} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(worksSchema) }}
      />
    </>
  );
};

export default WorksPage;
