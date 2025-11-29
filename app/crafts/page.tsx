import type { Metadata } from "next";
import { getImages } from "../../utils/fetch/getImages";
import { craftsMetadata } from "../../utils/marketing/seo/crafts/craftsMetadata";
import Images from "../../components/crafts/Images";
import GalleryPage from "../../components/crafts/GalleryPage";
import { Label } from "../../components/crafts/Filter";
import { craftsSchema } from "../../utils/marketing/seo/crafts/craftsSchema";

export const metadata: Metadata = craftsMetadata;

const Crafts = async () => {
  let images = null;

  try {
    images = await getImages();
  } catch (error) {
    console.error("Failed to fetch crafts images from database.");
  }

  return (
    <GalleryPage label={Label.All} schema={craftsSchema}>
      {images && <Images images={images} />}
    </GalleryPage>
  );
};

export default Crafts;
