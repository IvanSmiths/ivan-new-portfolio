import React, { FC } from "react";
import dynamic from "next/dynamic";

const ThemeToggle = dynamic(() => import("./ThemeToggle"), {
  ssr: false,
});

const Navbar: FC = () => {
  return (
    <nav className="fixed w-full  grid right-0 top-0 p-small h-[10%] z-20">
      <div className="grid-navbar-theme-toggle flex items-center">
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
