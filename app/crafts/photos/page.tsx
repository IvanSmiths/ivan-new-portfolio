import { FC } from "react";
import { db } from "../../../db/db";
import { photos as photosTable } from "../../../db/schema";
import Navbar, { Position } from "../../globalComponents/Navbar/Navbar";
import Footer from "../../globalComponents/Footer/Footer";
import Filter, { Pages } from "../components/Filter";
import Images from "../components/Images";

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
      <Filter currentPage={Pages.Photos} />
      <Navbar position={Position.Fixed} />
      <Images images={images} />
      <Footer />
    </>
  );
};

export default Photos;
