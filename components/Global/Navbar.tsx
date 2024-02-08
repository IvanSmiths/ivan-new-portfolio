import React, { FC } from "react";
import dynamic from "next/dynamic";

const ThemeToggle = dynamic(() => import("./ThemeToggle"), {
  ssr: false,
});

const Navbar: FC = () => {
  return (
    <nav className="fixed grid right-0 top-0 p-small h-[10%] z-10">
      <div className="grid-navbar-theme-toggle flex justify-center">
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
