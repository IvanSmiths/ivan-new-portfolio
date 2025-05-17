import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { dm_mono } from "../../../utils/fonts";
import InternalLinks from "./InternalLinks";

const Navbar = () => {
  return (
    <nav className="top-sm px-sm fixed z-10 flex w-full items-center justify-between">
      <Link href="/" className={`text-xs uppercase ${dm_mono.className}`}>
        Ivan Smiths
      </Link>
      <InternalLinks />
      <div className="flex w-24">
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
