import { FC } from "react";
import { db } from "../../../db/db";
import { renders as rendersTable } from "../../../db/schema";
import Navbar, { Position } from "../../globalComponents/Navbar/Navbar";
import Footer from "../../globalComponents/Footer/Footer";
import Filter, { Pages } from "../components/Filter";
import Images from "../components/Images";
import type { Metadata } from "next";

const title: string = "Ivan Smiths, images";
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

  return (
    <>
      <Navbar position={Position.Fixed} />
      <Filter currentPage={Pages.Renders} />
      <Images images={images} />
      <Footer />
    </>
  );
};

export default Renders;
