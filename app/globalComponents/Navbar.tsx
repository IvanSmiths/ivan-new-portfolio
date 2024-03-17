import { FC } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export enum NavbarClass {
  FIXED = "fixed",
}
type NavbarProps = {
  navbarClass?: NavbarClass;
};

const Navbar: FC<NavbarProps> = ({ navbarClass }) => {
  return (
    <nav
      className={` ${navbarClass === NavbarClass.FIXED ? "fixed h-fit" : "sm:sticky"} fixed sm:top-3 bottom-3 w-full flex-row-reverse sm:flex-row pr-small pl-small z-10 flex justify-between items-center`}
    >
      <ul className="flex gap-small items-center">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/works">Works</Link>
        </li>
        <li>
          <Link href="/blog">Blog</Link>
        </li>
      </ul>
      <ThemeToggle />
    </nav>
  );
};

export default Navbar;
