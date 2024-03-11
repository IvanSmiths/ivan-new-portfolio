import { FC } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const Navbar: FC = () => {
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
};

export default Navbar;
