import { FC } from "react";
import { db } from "../../../db/db";
import { renders as rendersTable } from "../../../db/schema";
import Navbar, { Position } from "../../globalComponents/Navbar/Navbar";
import Footer from "../../globalComponents/Footer/Footer";
import Filter, { Pages } from "../components/Filter";
import Images from "../components/Images";
import type { Metadata } from "next";
import Header from "../components/Header";

const title: string = "Ivan Smiths, renders";
const description: string =
  "Explore a showcase of my renders, including 3d renders of my hard surface modeling and sculpting.";

export const metadata: Metadata = {
  title: title,
  description: description,
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "Ivan Smiths",
    url: "https://ivansmiths.com/crafts/renders",
  },
  twitter: {
    title,
    description,
    card: "summary_large_image",
    creator: "@Ivansmiths",
    creatorId: "1303746727594405894",
  },
};

const Renders: FC = async () => {
  const images = await db
    .select({
      desktopUrl: rendersTable.desktopUrl,
      alt: rendersTable.alt,
      mobileUrl: rendersTable.mobileUrl,
      id: rendersTable.id,
      isHorizontal: rendersTable.isHorizontal,
    })
    .from(rendersTable)
    .all();

  const headerProps = {
    h1: "Renders",
    h2: "The beginning.",
    paragraph:
      "The renders are done with Blender and ZBrush, and are a mix of my hard surface modeling and sculpting.",
  };

  return (
    <>
      <Header
        h1={headerProps.h1}
        h2={headerProps.h2}
        paragraph={headerProps.paragraph}
      />
      <Navbar position={Position.Fixed} />
      <Filter currentPage={Pages.Renders} />
      <Images images={images} />
      <Footer />
    </>
  );
};

export default Renders;
