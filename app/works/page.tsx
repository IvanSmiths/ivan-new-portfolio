import type { Metadata } from "next";
import { FC } from "react";
import { worksSchema } from "../../utils/metadata/Schemas";
import { worksMetadata } from "../../utils/metadata/worksMetadata";
import Header from "../components/crafts/Header";
import { worksHeaderProps } from "../components/crafts/headerProps";
import Navbar, { Position } from "../components/global/Navbar/Navbar";
import WorksSection from "../components/works/WorksSection";
import { WorkBase } from "../../utils/fetch/graphql/graphqlTypes";
import { getWorks } from "../../utils/fetch/graphql";
import Footer from "../components/global/Footer/Footer";

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
