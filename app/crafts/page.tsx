import type { Metadata } from "next";
import { FC } from "react";
import { getImages } from "../../db/getImages";
import { craftsMetadata } from "../../utils/metadata/craftsMetadata";
import Footer from "../globalComponents/Footer/Footer";
import Navbar, { Position } from "../globalComponents/Navbar/Navbar";
import Filter, { Label } from "./components/Filter";
import Header from "./components/Header";
import Images from "./components/Images";
import { craftsHeaderProps } from "./components/headerProps";
import { craftsSchema } from "../../utils/metadata/Schemas";

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(craftsSchema) }}
      />
    </>
  );
};

export default Crafts;
