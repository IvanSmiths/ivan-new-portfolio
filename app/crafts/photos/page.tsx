import { FC } from "react";
import { db } from "../../../db/db";
import { photos as photosTable } from "../../../db/schema";
import Navbar, { Position } from "../../globalComponents/Navbar/Navbar";
import Footer from "../../globalComponents/Footer/Footer";
import Filter, { Pages } from "../components/Filter";
import Images from "../components/Images";
import type { Metadata } from "next";
import Header from "../components/Header";

const title: string = "Ivan Smiths, photos";
const description: string =
  "Explore a showcase of my photos, including images of my passions and hobbies.";

export const metadata: Metadata = {
  title: title,
  description: description,
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "Ivan Smiths",
    url: "https://ivansmiths.com/crafts/photos",
  },
  twitter: {
    title,
    description,
    card: "summary_large_image",
    creator: "@Ivansmiths",
    creatorId: "1303746727594405894",
  },
};

const Photos: FC = async () => {
  const images = await db
    .select({
      desktopUrl: photosTable.desktopUrl,
      alt: photosTable.alt,
      mobileUrl: photosTable.mobileUrl,
      id: photosTable.id,
      isHorizontal: photosTable.isHorizontal,
    })
    .from(photosTable)
    .all();

  const headerProps = {
    h1: "Photos",
    h2: "Trough a lens.",
    paragraph:
      "All the photos are taken with my Sony A7II across Italy, Germany, Luxembourg, and the United States.",
  };

  return (
    <>
      <Header
        h1={headerProps.h1}
        h2={headerProps.h2}
        paragraph={headerProps.paragraph}
      />
      <Navbar position={Position.Fixed} />
      <Filter currentPage={Pages.Photos} />
      <Images images={images} />
      <Footer />
    </>
  );
};

export default Photos;
