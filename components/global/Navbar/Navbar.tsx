import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import InternalLinks from "./InternalLinks";
import { dm_mono } from "../../../utils/fonts";
import ScrollPercentage from "./ScrollPercentage";

const Navbar = () => {
  return (
    <nav className="top-sm px-sm fixed z-10 flex w-full items-center justify-between">
      <Link href="/" className={`text-xs uppercase ${dm_mono.className}`}>
        Ivan Smiths
      </Link>
      <InternalLinks />
      <ScrollPercentage />
      <div className="flex w-24">
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
