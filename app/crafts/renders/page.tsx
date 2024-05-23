import { FC } from "react";
import { db } from "../../../db/db";
import { renders as rendersTable } from "../../../db/schema";
import Navbar, { Position } from "../../globalComponents/Navbar/Navbar";
import Footer from "../../globalComponents/Footer/Footer";
import Filter, { Pages } from "../components/Filter";
import Images from "../components/Images";

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
