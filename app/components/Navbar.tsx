import React from "react";
import Link from "next/link";

function Navbar() {
  return (
    <nav className="sticky top-4 pr-small pl-small z-10">
      <ul className="flex justify-between">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/works">Works</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
