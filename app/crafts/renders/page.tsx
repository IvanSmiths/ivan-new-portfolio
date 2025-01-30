import type { Metadata } from "next";
import { FC } from "react";
import { getRenders } from "../../../db/getImages";
import { rendersMetadata } from "../../../utils/metadata/craftsMetadata";
import Footer from "../../globalComponents/Footer/Footer";
import Navbar, { Position } from "../../globalComponents/Navbar/Navbar";
import Filter, { Label } from "../../components/crafts/Filter";
import Header from "../../components/crafts/Header";
import Images from "../../components/crafts/Images";
import { rendersHeaderProps } from "../../components/crafts/headerProps";
import { rendersSchema } from "../../../utils/metadata/Schemas";

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(rendersSchema) }}
      />
    </>
  );
};

export default Renders;
