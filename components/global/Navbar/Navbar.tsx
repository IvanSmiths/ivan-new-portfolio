import Link from "next/link";
import { dm_mono } from "../../../utils/style/fonts/fonts";
import InternalLinks from "./InternalLinks";
import ScrollPercentage from "./ScrollPercentage";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <nav
      className="fixed bottom-0 left-0 z-30 flex flex-row-reverse md:flex-row w-full items-center justify-between border-t border-background-muted bg-background px-sm py-sm md:top-0 md:bottom-auto md:border-t-0 md:border-b">
      <Link
        href="/"
        scroll={false}
        className={`text-xs hidden md:block uppercase ${dm_mono.className}`}
      >
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
