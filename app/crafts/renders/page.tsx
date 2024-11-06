import type { Metadata } from "next";
import { FC } from "react";
import { getRenders } from "../../../db/getImages";
import { rendersMetadata } from "../../../utils/metadata/craftsMetadata";
import Footer from "../../globalComponents/Footer/Footer";
import Navbar, { Position } from "../../globalComponents/Navbar/Navbar";
import Filter, { Label } from "../components/Filter";
import Header from "../components/Header";
import Images from "../components/Images";

export const metadata: Metadata = rendersMetadata;

const Renders: FC = async () => {
  const images = await getRenders();

  const headerProps = {
    h1: "Renders",
    h2: "The beginning.",
    paragraph:
      "Explore my 3D renders, featuring detailed hard surface modeling and sculpting projects. This showcase my creativity and technical skills in 3D design, bringing intricate virtual models to life.",
  };

  return (
    <>
      <Header
        h1={headerProps.h1}
        h2={headerProps.h2}
        paragraph={headerProps.paragraph}
      />
      <Navbar position={Position.Fixed} />
      <Filter currentPage={Label.Renders} />
      <Images images={images} />
      <Footer />
    </>
  );
};

export default Renders;
