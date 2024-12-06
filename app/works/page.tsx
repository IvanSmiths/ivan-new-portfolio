import type { Metadata } from "next";
import { FC } from "react";
import { worksSchema } from "../../utils/metadata/Schemas";
import { worksMetadata } from "../../utils/metadata/worksMetadata";
import Header from "../crafts/components/Header";
import { worksHeaderProps } from "../crafts/components/headerProps";
import Footer from "../globalComponents/Footer/Footer";
import Navbar, { Position } from "../globalComponents/Navbar/Navbar";
import WorksSection from "./components/WorksSection";
import { WorkBase } from "../../utils/graphql/graphqlTypes";
import { getWorks } from "../../utils/graphql";

export const metadata: Metadata = worksMetadata;

const WorksPage: FC = async () => {
  const works: WorkBase[] = await getWorks();

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
