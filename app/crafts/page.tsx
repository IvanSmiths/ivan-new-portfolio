import type { Metadata } from "next";
import { FC } from "react";
import { getImages } from "../../utils/fetch/getImages";
import { craftsMetadata } from "../../utils/metadata/craftsMetadata";
import { craftsSchema } from "../../utils/metadata/Schemas";
import { craftsHeaderProps } from "../../components/crafts/headerProps";
import Images from "../../components/crafts/Images";
import GalleryPage from "../../components/crafts/GalleryPage";
import { Label } from "../../components/crafts/Filter";

export const metadata: Metadata = craftsMetadata;

const Crafts: FC = async () => {
  let images = null;

  try {
    images = await getImages();
  } catch (error) {
    console.error("Failed to fetch crafts images from database.");
  }

  return (
    <GalleryPage
      header={craftsHeaderProps}
      label={Label.All}
      schema={craftsSchema}
    >
      {images && <Images images={images} />}
    </GalleryPage>
  );
};

export default Crafts;
