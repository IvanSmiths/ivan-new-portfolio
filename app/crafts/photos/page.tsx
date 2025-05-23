import type { Metadata } from "next";
import { FC } from "react";
import { getPhotos } from "../../../utils/fetch/getImages";
import { photosMetadata } from "../../../utils/seo/crafts/craftsMetadata";
import { photoHeaderProps } from "../../../components/global/header/headerProps";
import Images from "../../../components/crafts/Images";
import GalleryPage from "../../../components/crafts/GalleryPage";
import { Label } from "../../../components/crafts/Filter";
import { photosSchema } from "../../../utils/seo/crafts/craftsSchema";

export const metadata: Metadata = photosMetadata;

const Photos: FC = async () => {
  let images = null;

  try {
    images = await getPhotos();
  } catch (error) {
    console.error("Failed to fetch photos from database.");
  }

  return (
    <GalleryPage
      header={photoHeaderProps}
      label={Label.Photos}
      schema={photosSchema}
    >
      {images && <Images images={images} />}
    </GalleryPage>
  );
};

export default Photos;
