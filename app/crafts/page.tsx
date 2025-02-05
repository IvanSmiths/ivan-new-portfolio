import type { Metadata } from "next";
import { FC } from "react";
import { getImages } from "../../utils/fetch/getImages";
import { craftsMetadata } from "../../utils/metadata/craftsMetadata";
import Navbar, { Position } from "../components/global/Navbar/Navbar";
import Filter, { Label } from "../components/crafts/Filter";
import Header from "../components/crafts/Header";
import Images from "../components/crafts/Images";
import { craftsHeaderProps } from "../components/crafts/headerProps";
import { craftsSchema } from "../../utils/metadata/Schemas";
import Footer from "../components/global/Footer/Footer";

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
