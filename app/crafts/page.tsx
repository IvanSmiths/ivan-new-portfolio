import { FC } from "react";
import Navbar, { Position } from "../globalComponents/Navbar/Navbar";
import { db } from "../../db/db";
import {
  photos as photosTable,
  renders as rendersTable,
} from "../../db/schema";
import Footer from "../globalComponents/Footer/Footer";

const Crafts: FC = async () => {
  const photos = await db
    .select({
      desktopUrl: photosTable.desktopUrl,
      alt: photosTable.alt,
      mobileUrl: photosTable.mobileUrl,
      id: photosTable.id,
      isHorizontal: photosTable.isHorizontal,
    })
    .from(photosTable)
    .all();
  const renders = await db
    .select({
      desktopUrl: rendersTable.desktopUrl,
      alt: rendersTable.alt,
      mobileUrl: rendersTable.mobileUrl,
      id: rendersTable.id,
      isHorizontal: rendersTable.isHorizontal,
    })
    .from(rendersTable)
    .all();

  const images = [...photos, ...renders];
  console.log(images);
  return (
    <>
      <Navbar position={Position.Fixed} />
      <div className="mt-small grid">
        <div className="col-span-full">
          <main className="col-span-full flex flex-wrap gap-small">
            {images.map((image, index: number) => (
              <div
                key={index}
                className={`w-full flex-auto md:w-3/12 ${image.isHorizontal ? " md:w-[58.8%]" : ""}`}
              >
                <img
                  src={image.desktopUrl}
                  srcSet={`${image.desktopUrl} 2000w, ${image.mobileUrl} 1500w`}
                  sizes="(min-width: 66em) 2000px, 1500px"
                  fetchPriority={index < 4 ? "high" : "low"}
                  loading={index > 4 ? "lazy" : "eager"}
                  height="2000"
                  width="3000"
                  alt={image.alt}
                  className="h-full w-full rounded-lg object-cover object-center"
                />
              </div>
            ))}
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Crafts;
