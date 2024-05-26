import { FC } from "react";
import { db } from "../../../db/db";
import { photos as photosTable } from "../../../db/schema";
import Navbar, { Position } from "../../globalComponents/Navbar/Navbar";
import Footer from "../../globalComponents/Footer/Footer";
import Filter, { Pages } from "../components/Filter";
import Images from "../components/Images";
import type { Metadata } from "next";

const title: string = "Ivan Smiths, images";
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

  return (
    <>
      <Navbar position={Position.Fixed} />
      <Filter currentPage={Pages.Photos} />
      <Images images={images} />
      <Footer />
    </>
  );
};

export default Photos;
