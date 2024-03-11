import React from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  return (
    <nav className="sticky top-3 pr-small pl-small z-10 flex justify-between items-center">
      <ul className="flex gap-small items-center">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/works">Works</Link>
        </li>
      </ul>
      <ThemeToggle />
    </nav>
  );
}

export default Navbar;
