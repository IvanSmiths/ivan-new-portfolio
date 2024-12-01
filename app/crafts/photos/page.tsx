import type { Metadata } from "next";
import { FC } from "react";
import { getPhotos } from "../../../db/getImages";
import { photosMetadata } from "../../../utils/metadata/craftsMetadata";
import Filter, { Label } from "../../components/crafts/Filter";
import Header from "../../components/crafts/Header";
import { photoHeaderProps } from "../../components/crafts/headerProps";
import Images from "../../components/crafts/Images";
import Footer from "../../components/global/Footer/Footer";
import Navbar, { Position } from "../../components/global/Navbar/Navbar";

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
    </>
  );
};

export default Photos;
