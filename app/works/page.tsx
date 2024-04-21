import Navbar, { Position } from "../globalComponents/Navbar/Navbar";
import ScrollSection from "./components/ScrollSection";
import type { Metadata } from "next";
import { getWorks, Works } from "../../utils/graphql";
import { FC } from "react";
import { worksSchema } from "../../utils/Schemas";

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

const Works: FC = async () => {
  const works: Works[] = await getWorks();
  return (
    <>
      <Navbar position={Position.Fixed} />
      <ScrollSection works={works} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(worksSchema) }}
      />
    </>
  );
};

export default Works;
