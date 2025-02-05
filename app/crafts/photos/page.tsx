import type { Metadata } from "next";
import { FC } from "react";
import { getPhotos } from "../../../utils/fetch/getImages";
import { photoHeaderProps } from "../../components/crafts/headerProps";
import { photosMetadata } from "../../../utils/metadata/craftsMetadata";
import Navbar, { Position } from "../../components/global/Navbar/Navbar";
import Filter, { Label } from "../../components/crafts/Filter";
import Header from "../../components/crafts/Header";
import Images from "../../components/crafts/Images";
import { photosSchema } from "../../../utils/metadata/Schemas";
import Footer from "../../components/global/Footer/Footer";

export const metadata: Metadata = photosMetadata;

const Photos: FC = async () => {
  const images = await getPhotos();

  return (
    <>
      <Header
        h1={photoHeaderProps.h1}
        h2={photoHeaderProps.h2}
        paragraph={photoHeaderProps.paragraph}
      />
      <Navbar position={Position.Fixed} />
      <Filter currentPage={Label.Photos} />
      <Images images={images} />
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(photosSchema) }}
      />
    </>
  );
};

export default Photos;
