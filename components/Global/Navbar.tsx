import React, { FC } from "react";
import dynamic from "next/dynamic";

const ThemeToggle = dynamic(() => import("./ThemeToggle"), {
  ssr: false,
});

const Navbar: FC = () => {
  return (
    <nav className="fixed w-full p-small z-10 flex justify-end">
      <ThemeToggle />
    </nav>
  );
};

export default Navbar;
