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

  return (
    <>
      <Navbar position={Position.Fixed} />
      <Filter currentPage={Pages.All} />
      <Images images={images} />
      <Footer />
    </>
  );
};

export default Crafts;
