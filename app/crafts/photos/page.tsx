import type { Metadata } from "next";
import { FC } from "react";
import { getPhotos } from "../../../db/getImages";
import { photoHeaderProps } from "../components/headerProps";
import { photosMetadata } from "../../../utils/metadata/craftsMetadata";
import Footer from "../../globalComponents/Footer/Footer";
import Navbar, { Position } from "../../globalComponents/Navbar/Navbar";
import Filter, { Label } from "../components/Filter";
import Header from "../components/Header";
import Images from "../components/Images";
import { photosSchema } from "../../../utils/metadata/Schemas";

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
