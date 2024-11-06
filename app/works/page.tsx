import type { Metadata } from "next";
import { FC } from "react";
import { getWorks, Works } from "../../utils/graphql";
import { worksSchema } from "../../utils/metadata/Schemas";
import { worksMetadata } from "../../utils/metadata/worksMetadata";
import Header from "../crafts/components/Header";
import { worksHeaderProps } from "../crafts/components/headerProps";
import Footer from "../globalComponents/Footer/Footer";
import Navbar, { Position } from "../globalComponents/Navbar/Navbar";
import WorksSection from "./components/WorksSection";

export const metadata: Metadata = worksMetadata;

const WorksPage: FC = async () => {
  const works: Works[] = await getWorks();

  return (
    <>
      <Header
        h1={worksHeaderProps.h1}
        h2={worksHeaderProps.h2}
        paragraph={worksHeaderProps.paragraph}
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
