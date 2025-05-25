import { useRef } from "react";
import ThemeToggle from "../ThemeToggle";
import NavLinks from "./NavLinks";
import { useNavFade } from "../../../../utils/hooks/animations/useNavFade";

type NavMenuProps = {
  isOpen: boolean;
  toggleMenu: () => void;
};

export default function NavMenu({ isOpen, toggleMenu }: NavMenuProps) {
  const navRef = useRef<HTMLDivElement | null>(null);
  const linksRef = useRef<(HTMLLIElement | null)[]>([]);
  const themeToggleRef = useRef<HTMLDivElement | null>(null);

  useNavFade({ isOpen, navRef, linksRef, themeToggleRef });

  return (
    <nav
      ref={navRef}
      className={`bg-background fixed inset-0 z-[21] flex flex-col items-end justify-center transition ${
        isOpen ? "" : "pointer-events-none"
      }`}
      style={{ opacity: 0 }}
    >
      <NavLinks toggleMenu={toggleMenu} linksRef={linksRef} />
      <div
        onClick={toggleMenu}
        ref={themeToggleRef}
        className="mt-small pr-small opacity-0"
      >
        <div className="mx-sm mt-md w-full">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
