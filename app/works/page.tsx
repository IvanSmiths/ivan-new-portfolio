import Navbar, { Position } from "../globalComponents/Navbar/Navbar";
import ScrollSection from "./components/ScrollSection";
import type { Metadata } from "next";
import { getWorks, WorkType } from "../../utils/graphql";
import { FC } from "react";

const schemaData = {
  "@context": "http://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Ivan Smiths, Frontend UI/UX Developer from Wiesbaden",
      item: "https://ivansmiths.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Ivan Smiths, all the works",
      item: "https://ivansmiths.com/works",
    },
  ],
};

export const metadata: Metadata = {
  title: "Ivan Smiths, all the works",
  description:
    "Explore a showcase of my diverse works as a UI/UX Developer, encompassing a range of works that highlight my expertise and creativity",
};

const Works: FC = async () => {
  const works: WorkType[] = await getWorks();
  return (
    <>
      <Navbar position={Position.Fixed} />
      <ScrollSection works={works} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    </>
  );
};

export default Works;
