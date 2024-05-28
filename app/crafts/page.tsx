import { FC } from "react";
import Navbar, { Position } from "../globalComponents/Navbar/Navbar";
import { db } from "../../db/db";
import {
  photos as photosTable,
  renders as rendersTable,
} from "../../db/schema";
import Footer from "../globalComponents/Footer/Footer";
import Filter, { Pages } from "./components/Filter";
import Images from "./components/Images";
import type { Metadata } from "next";
import Header from "./components/Header";

const title: string = "Ivan Smiths, images";
const description: string =
  "Explore a showcase of my images, including photos and renders.";

export const metadata: Metadata = {
  title: title,
  description: description,
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "Ivan Smiths",
    url: "https://ivansmiths.com/crafts",
  },
  twitter: {
    title,
    description,
    card: "summary_large_image",
    creator: "@Ivansmiths",
    creatorId: "1303746727594405894",
  },
};

const Crafts: FC = async () => {
  const photos = await db
    .select({
      desktopUrl: photosTable.desktopUrl,
      alt: photosTable.alt,
      mobileUrl: photosTable.mobileUrl,
      id: photosTable.id,
      isHorizontal: photosTable.isHorizontal,
    })
    .from(photosTable)
    .all();
  const renders = await db
    .select({
      desktopUrl: rendersTable.desktopUrl,
      alt: rendersTable.alt,
      mobileUrl: rendersTable.mobileUrl,
      id: rendersTable.id,
      isHorizontal: rendersTable.isHorizontal,
    })
    .from(rendersTable)
    .all();

  const images = [...photos, ...renders];

  const headerProps = {
    h1: "Crafts",
    h2: "My passions outside the code",
    paragraph:
      "Here i share some of my creations, including photos using my Sony A7II, and renders, where the hard surface one are done with Blender and the sculpting ones with Zbrush.",
  };

  return (
    <>
      <Header
        h1={headerProps.h1}
        h2={headerProps.h2}
        paragraph={headerProps.paragraph}
      />
      <Navbar position={Position.Fixed} />
      <Filter currentPage={Pages.All} />
      <Images images={images} />
      <Footer />
    </>
  );
};

export default Crafts;
