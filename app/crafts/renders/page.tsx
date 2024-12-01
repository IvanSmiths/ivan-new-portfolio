import type { Metadata } from "next";
import { FC } from "react";
import { getRenders } from "../../../db/getImages";
import { rendersMetadata } from "../../../utils/metadata/craftsMetadata";
import Filter, { Label } from "../../components/crafts/Filter";
import Header from "../../components/crafts/Header";
import Images from "../../components/crafts/Images";
import { rendersHeaderProps } from "../../components/crafts/headerProps";
import Footer from "../../components/global/Footer/Footer";
import Navbar, { Position } from "../../components/global/Navbar/Navbar";

export const metadata: Metadata = rendersMetadata;

const Renders: FC = async () => {
  const images = await getRenders();

  return (
    <>
      <Header
        h1={rendersHeaderProps.h1}
        h2={rendersHeaderProps.h2}
        paragraph={rendersHeaderProps.paragraph}
      />
      <Navbar position={Position.Fixed} />
      <Filter currentPage={Label.Renders} />
      <Images images={images} />
      <Footer />
    </>
  );
};

export default Renders;
