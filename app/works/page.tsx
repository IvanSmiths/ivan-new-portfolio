import Navbar, { Position } from "../globalComponents/Navbar/Navbar";
import ScrollSection from "./components/ScrollSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ivan Smiths, all the works",
  description:
    "Explore a showcase of my diverse works as a UI/UX Developer, encompassing a range of works that highlight my expertise and creativity",
};

function Works() {
  return (
    <>
      <Navbar position={Position.Fixed} />
      <ScrollSection />
    </>
  );
}

export default Works;
