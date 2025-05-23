import type { Metadata } from "next";
import { FC } from "react";
import { getRenders } from "../../../utils/fetch/getImages";
import { rendersMetadata } from "../../../utils/seo/crafts/craftsMetadata";
import { rendersHeaderProps } from "../../../components/global/header/headerProps";
import Images from "../../../components/crafts/Images";
import GalleryPage from "../../../components/crafts/GalleryPage";
import { Label } from "../../../components/crafts/Filter";
import { rendersSchema } from "../../../utils/seo/crafts/craftsSchema";

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
