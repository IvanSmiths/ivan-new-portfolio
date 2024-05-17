import { FC } from "react";
import Navbar, { Position } from "../globalComponents/Navbar/Navbar";
import { prisma } from "../../prisma/db";

const Crafts: FC = async () => {
  const photos = await prisma.photos.findMany();

  console.log(photos);
  return (
    <div>
      <Navbar position={Position.Fixed} />
    </div>
  );
};

export default Crafts;
