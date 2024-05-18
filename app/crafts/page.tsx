import { FC } from "react";
import Navbar, { Position } from "../globalComponents/Navbar/Navbar";
import { db } from "../../db/db";
import { photosTable } from "../../db/schema";

const Crafts: FC = async () => {
  const photos = await db
    .select({ desktopUrl: photosTable.desktopUrl, alt: photosTable.alt })
    .from(photosTable)
    .all();
  return (
    <div>
      <Navbar position={Position.Fixed} />
    </div>
  );
};

export default Crafts;
