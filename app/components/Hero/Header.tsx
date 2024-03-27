"use client";

import { FC } from "react";
import Logo from "./Logo";

const Header: FC = () => {
  return (
    <div className="grid z-20 relative">
      <div className="col-start-1 col-end-13 pt-small flex gap-4 flex-col">
        <Logo />
      </div>
    </div>
  );
};

export default Header;
