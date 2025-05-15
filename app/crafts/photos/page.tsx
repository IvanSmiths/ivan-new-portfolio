import type { Metadata } from "next";
import { FC } from "react";
import { getPhotos } from "../../../utils/fetch/getImages";
import { photosMetadata } from "../../../utils/metadata/craftsMetadata";
import { photosSchema } from "../../../utils/metadata/Schemas";
import { photoHeaderProps } from "../../../components/crafts/headerProps";
import Images from "../../../components/crafts/Images";
import GalleryPage from "../../../components/crafts/GalleryPage";
import { Label } from "../../../components/crafts/Filter";

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
