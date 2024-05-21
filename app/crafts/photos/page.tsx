import { FC } from "react";
import { db } from "../../../db/db";
import { photos as photosTable } from "../../../db/schema";
import Navbar, { Position } from "../../globalComponents/Navbar/Navbar";
import Footer from "../../globalComponents/Footer/Footer";
import Filter from "../components/Filter";

const Photos: FC = async () => {
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

  return (
    <>
      <Filter />
      <Navbar position={Position.Fixed} />
      <div className="mt-small grid">
        <div className="col-span-full">
          <main className="col-span-full flex flex-wrap gap-small">
            {photos.map((photo, index: number) => (
              <div
                key={index}
                className={`w-full flex-auto md:w-3/12 ${photo.isHorizontal ? " md:w-[58.8%]" : ""}`}
              >
                <img
                  src={photo.desktopUrl}
                  srcSet={`${photo.desktopUrl} 2000w, ${photo.mobileUrl} 1500w`}
                  sizes="(min-width: 66em) 2000px, 1500px"
                  fetchPriority={index < 4 ? "high" : "low"}
                  loading={index > 4 ? "lazy" : "eager"}
                  height="2000"
                  width="3000"
                  alt={photo.alt}
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

export default Photos;
