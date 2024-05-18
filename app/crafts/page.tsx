import { FC } from "react";
import Navbar, { Position } from "../globalComponents/Navbar/Navbar";
import { db } from "../../db/db";
import { photos as photosTable } from "../../db/schema";

const Crafts: FC = async () => {
  const photos = await db
    .select({ desktopUrl: photosTable.desktopUrl, alt: photosTable.alt })
    .from(photosTable)
    .all();

  console.log(photos);

  return (
    <div>
      <Navbar position={Position.Fixed} />
      {photos.map((photo, index: number) => (
        <img
          key={index}
          src={photo.desktopUrl}
          loading="lazy"
          height="1200"
          width="1200"
          alt={photo.alt}
          className="h-full w-full rounded-lg object-cover object-center"
        />
      ))}
    </div>
  );
};

export default Crafts;
