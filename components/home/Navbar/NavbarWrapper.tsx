"use client";

import { FC } from "react";
import Navbar from "../../global/Navbar/Navbar";

const NavbarWrapper: FC = () => {
  return (
    <div data-testid="navbarWrapper" className="z-20 hidden pt-2 md:block">
      <Navbar />
    </div>
  );
};

export default NavbarWrapper;
