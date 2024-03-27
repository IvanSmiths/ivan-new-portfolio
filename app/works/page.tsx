import Navbar, { Position } from "../globalComponents/Navbar/Navbar";
import ScrollSection from "./components/ScrollSection";
import type { Metadata } from "next";
import { getWorks } from "../../utils/graphql";
import { FC } from "react";

export const metadata: Metadata = {
  title: "Ivan Smiths, all the works",
  description:
    "Explore a showcase of my diverse works as a UI/UX Developer, encompassing a range of works that highlight my expertise and creativity",
};

const Works: FC = async () => {
  const works = await getWorks();
  return (
    <>
      <Navbar position={Position.Fixed} />
      {/* @ts-ignore */}
      <ScrollSection works={works} />
    </>
  );
};

export default Works;
