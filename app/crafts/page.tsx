import { FC } from "react";
import Navbar, { Position } from "../globalComponents/Navbar/Navbar";
import { db } from "../../db/db";
import { photos as photosTable } from "../../db/schema";
import Footer from "../globalComponents/Footer/Footer";

const Crafts: FC = async () => {
  const photos = await db
    .select({
      desktopUrl: photosTable.desktopUrl,
      alt: photosTable.alt,
      mobileUrl: photosTable.mobileUrl,
      id: photosTable.id,
    })
    .from(photosTable)
    .all();

  return (
    <>
      <Navbar position={Position.Fixed} />
      <div className="mt-small grid">
        <div className="col-span-full">
          <div className="col-span-full flex flex-wrap gap-small">
            {photos.map((photo, index: number) => (
              <div key={index} className="w-full flex-auto md:w-1/12 lg:w-3/12">
                <img
                  src={photo.desktopUrl}
                  loading="lazy"
                  height="2000"
                  width="3000"
                  alt={photo.alt}
                  className="h-full w-full rounded-lg object-cover object-center"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Crafts;
