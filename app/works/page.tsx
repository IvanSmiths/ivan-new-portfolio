import type { Metadata } from "next";
import { FC } from "react";
import { getWorks } from "../../utils/graphql";
import { Works } from "../../utils/graphql/graphqlTypes";
import { worksSchema } from "../../utils/metadata/Schemas";
import { worksMetadata } from "../../utils/metadata/worksMetadata";
import Header from "../components/crafts/Header";
import { worksHeaderProps } from "../components/crafts/headerProps";
import Footer from "../components/global/Footer/Footer";
import Navbar, { Position } from "../components/global/Navbar/Navbar";
import WorksSection from "../components/works/WorksSection";

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
