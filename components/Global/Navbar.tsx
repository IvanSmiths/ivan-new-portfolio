import React, { FC } from "react";
import dynamic from "next/dynamic";

const ThemeToggle = dynamic(() => import("./ThemeToggle"), {
  ssr: false,
});

const Navbar: FC = () => {
  return (
    <nav className="fixed right-0 top-0 p-small z-10">
      <ThemeToggle />
    </nav>
  );
};

export default Navbar;
