import type { Metadata } from "next";
import { FC } from "react";
import { getRenders } from "../../../utils/fetch/getImages";
import { rendersMetadata } from "../../../utils/metadata/craftsMetadata";
import { rendersSchema } from "../../../utils/metadata/Schemas";
import { rendersHeaderProps } from "../../../components/crafts/headerProps";
import Images from "../../../components/crafts/Images";
import GalleryPage from "../../../components/crafts/GalleryPage";
import { Label } from "../../../components/crafts/Filter";

export const metadata: Metadata = rendersMetadata;

const Renders: FC = async () => {
  let images = null;

  try {
    images = await getRenders();
  } catch (error) {
    console.error("Failed to fetch renders:", error);
  }

  return (
    <GalleryPage
      header={rendersHeaderProps}
      label={Label.Renders}
      schema={rendersSchema}
    >
      {images && <Images images={images} />}
    </GalleryPage>
  );
};

export default Renders;
