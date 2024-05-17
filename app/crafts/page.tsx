import { FC } from "react";
import Navbar, { Position } from "../globalComponents/Navbar/Navbar";

const Crafts: FC = async () => {
  return (
    <div>
      <Navbar position={Position.Fixed} />
    </div>
  );
};

export default Crafts;
