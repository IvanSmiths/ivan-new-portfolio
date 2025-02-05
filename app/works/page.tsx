import type { Metadata } from "next";
import { FC, ReactNode } from "react";
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

type WorksLayoutProps = {
  children?: ReactNode;
};

const WorksLayout: FC<WorksLayoutProps> = ({ children }) => (
  <>
    <Header
      h1={worksHeaderProps.h1}
      h2={worksHeaderProps.h2}
      paragraph={worksHeaderProps.paragraph}
    />
    <Navbar position={Position.Fixed} />
    {children}
    <Footer />
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(worksSchema) }}
    />
  </>
);

const WorksPage: FC = async () => {
  try {
    const works: WorkBase[] = await getWorks();
    return <WorksLayout>{works && <WorksSection works={works} />}</WorksLayout>;
  } catch (error) {
    console.error("Failed to fetch works:", error);
    return <WorksLayout />;
  }
};

export default WorksPage;
