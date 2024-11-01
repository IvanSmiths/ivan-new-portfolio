import type { Metadata } from "next";
import { FC } from "react";
import { getWorks, Works } from "../../utils/graphql";
import { worksSchema } from "../../utils/Schemas";
import Header from "../crafts/components/Header";
import Footer from "../globalComponents/Footer/Footer";
import Navbar, { Position } from "../globalComponents/Navbar/Navbar";
import WorksSection from "./components/WorksSection";

const title: string = "Ivan Smiths, all the works";
const description: string =
  "Explore a showcase of my diverse works as a UI/UX Developer, encompassing a range of works that highlight my expertise and creativity";

export const metadata: Metadata = {
  title: title,
  description: description,
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "Ivan Smiths",
    url: `https://ivansmiths.com/works`,
  },
  twitter: {
    title,
    description,
    card: "summary_large_image",
    creator: "@Ivansmiths",
    creatorId: "1303746727594405894",
  },
};

const headerProps = {
  h1: "Works",
  h2: "All my works",
  paragraph:
    "I'm a UI/UX Developer, and I love to create beautiful and functional designs. Here, you'll find a collection of my works, showcasing my skills and creativity.",
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
