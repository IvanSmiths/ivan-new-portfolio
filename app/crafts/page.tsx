import type { Metadata } from "next";
import { FC } from "react";
import { getImages } from "../../db/getImages";
import { craftsMetadata } from "../../utils/metadata/craftsMetadata";
import Footer from "../globalComponents/Footer/Footer";
import Navbar, { Position } from "../globalComponents/Navbar/Navbar";
import Filter, { Label } from "./components/Filter";
import Header from "./components/Header";
import Images from "./components/Images";

export const metadata: Metadata = craftsMetadata;

const Crafts: FC = async () => {
  const images = await getImages();

  const headerProps = {
    h1: "Crafts",
    h2: "My passions outside the code",
    paragraph:
      "Step into my visual world, where moments come alive through a Sony full-frame mirrorless lens. This collection captures diverse scenes and creative renderings, showcasing my passion for photography and 3d modeling.",
  };

  return (
    <>
      <Header
        h1={headerProps.h1}
        h2={headerProps.h2}
        paragraph={headerProps.paragraph}
      />
      <Navbar position={Position.Fixed} />
      <Filter currentPage={Label.All} />
      <Images images={images} />
      <Footer />
    </>
  );
};

export default Crafts;
