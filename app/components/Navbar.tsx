import React from "react";
import Link from "next/link";

function Navbar() {
  return (
    <nav className="sticky top-4 pr-small pl-small">
      <ul className="flex justify-between">
        <li>
          <Link href="/"></Link>
          Home
        </li>
        <li>
          <Link href="/works">Works</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
