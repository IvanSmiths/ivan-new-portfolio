import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { dm_mono } from "../../../utils/fonts/fonts";
import ScrollPercentage from "./ScrollPercentage";
import InternalLinks from "./InternalLinks";

const Navbar = () => {
  return (
    <nav className="py-sm px-sm bg-background border-background-muted fixed top-0 z-30 hidden w-full items-center justify-between border-b md:flex">
      <Link href="/" className={`text-xs uppercase ${dm_mono.className}`}>
        Ivan Smiths
      </Link>
      <InternalLinks />
      <ScrollPercentage />
      <div className="flex w-24 justify-end">
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
