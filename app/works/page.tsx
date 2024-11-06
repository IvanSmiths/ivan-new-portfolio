import type { Metadata } from "next";
import { FC } from "react";
import { getWorks, Works } from "../../utils/graphql";
import { worksMetadata } from "../../utils/metadata/worksMetadata";
import { worksSchema } from "../../utils/Schemas";
import Header from "../crafts/components/Header";
import Footer from "../globalComponents/Footer/Footer";
import Navbar, { Position } from "../globalComponents/Navbar/Navbar";
import WorksSection from "./components/WorksSection";

export const metadata: Metadata = worksMetadata;

const headerProps = {
  h1: "Works",
  h2: "All my works",
  paragraph:
    "Discover a diverse range of projects in UI/UX and Fullstack Development. Explore award-winning websites, high-traffic landing pages, and innovative e-commerce platforms crafted for clients like Deutsche Bahn, R+V, Adidas, and WMF",
};

const WorksPage: FC = async () => {
  const works: Works[] = await getWorks();

  return (
    <>
      <Header
        h1={headerProps.h1}
        h2={headerProps.h2}
        paragraph={headerProps.paragraph}
      />
      <Navbar position={Position.Fixed} />
      <WorksSection works={works} />
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(worksSchema) }}
      />
    </>
  );
};

export default WorksPage;
