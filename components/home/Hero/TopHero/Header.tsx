import { FC } from "react";
import Logo from "./Logo";

const Header: FC = () => {
  return (
    <div className="relative z-20">
      <div className="flex">
        <Logo />
      </div>
    </div>
  );
};

export default Header;
