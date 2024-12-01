import type { Metadata } from "next";
import { FC } from "react";
import { getImages } from "../../db/getImages";
import { craftsMetadata } from "../../utils/metadata/craftsMetadata";
import Filter, { Label } from "../components/crafts/Filter";
import Header from "../components/crafts/Header";
import Images from "../components/crafts/Images";
import { craftsHeaderProps } from "../components/crafts/headerProps";
import Footer from "../components/global/Footer/Footer";
import Navbar, { Position } from "../components/global/Navbar/Navbar";

export const metadata: Metadata = craftsMetadata;

const Crafts: FC = async () => {
  const images = await getImages();

  return (
    <>
      <Header
        h1={craftsHeaderProps.h1}
        h2={craftsHeaderProps.h2}
        paragraph={craftsHeaderProps.paragraph}
      />
      <Navbar position={Position.Fixed} />
      <Filter currentPage={Label.All} />
      <Images images={images} />
      <Footer />
    </>
  );
};

export default Crafts;
