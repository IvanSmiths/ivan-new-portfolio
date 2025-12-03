import type { Metadata } from "next";
import { getRenders } from "../../../utils/fetch/getImages";
import { rendersMetadata } from "../../../utils/marketing/seo/crafts/craftsMetadata";
import Images from "../../../components/crafts/Images";
import GalleryPage from "../../../components/crafts/GalleryPage";
import { Label } from "../../../components/crafts/Filter";
import { rendersSchema } from "../../../utils/marketing/seo/crafts/craftsSchema";

export const metadata: Metadata = rendersMetadata;

const Renders = async () => {
  let images = null;

  try {
    images = await getRenders();
  } catch (error) {
    console.error("Failed to fetch renders:", error);
  }

  return (
    <GalleryPage label={Label.Renders} schema={rendersSchema}>
      {images && <Images images={images} />}
    </GalleryPage>
  );
};

export default Renders;
