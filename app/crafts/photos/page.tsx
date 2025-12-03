import type { Metadata } from "next";
import { getPhotos } from "../../../utils/fetch/getImages";
import { photosMetadata } from "../../../utils/marketing/seo/crafts/craftsMetadata";
import Images from "../../../components/crafts/Images";
import GalleryPage from "../../../components/crafts/GalleryPage";
import { Label } from "../../../components/crafts/Filter";
import { photosSchema } from "../../../utils/marketing/seo/crafts/craftsSchema";

export const metadata: Metadata = photosMetadata;

const Photos = async () => {
  let images = null;

  try {
    images = await getPhotos();
  } catch (error) {
    console.error("Failed to fetch photos from database.");
  }

  return (
    <GalleryPage label={Label.Photos} schema={photosSchema}>
      {images && <Images images={images} />}
    </GalleryPage>
  );
};

export default Photos;
