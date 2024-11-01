import gsap from "gsap";
import { useEffect, useRef } from "react";
import ThemeToggle from "../ThemeToggle";
import NavLinks from "./NavLinks";

interface NavMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
  pathname: string;
}

export default function NavMenu({
  isOpen,
  toggleMenu,
  pathname,
}: NavMenuProps) {
  const navRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLLIElement | null)[]>([]);
  const themeToggleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!navRef.current) return;

    const navElement: HTMLDivElement | null = navRef.current;
    const linkElements: HTMLLIElement[] = linksRef.current.filter(
      (el: HTMLLIElement | null): el is HTMLLIElement => el !== null,
    );

    if (isOpen) {
      gsap.to(navElement, { opacity: 1, duration: 0.3, ease: "power2.inOut" });
      gsap.fromTo(
        linkElements,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.2,
        },
      );
      gsap.to(themeToggleRef.current, {
        opacity: 1,
        y: 0,
        delay: 0.4,
        duration: 0.3,
        ease: "power2.in",
      });
    } else {
      gsap.to(linkElements, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.in",
      });
      gsap.to(themeToggleRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        delay: 0.2,
        ease: "power2.in",
      });
      gsap.to(navElement, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
        delay: 0.6,
      });
    }
  }, [isOpen]);

  return (
    <nav
      ref={navRef}
      className={`fixed inset-0 z-30 flex flex-col items-end justify-center bg-light transition dark:bg-dark ${
        isOpen ? "" : "pointer-events-none"
      }`}
      style={{ opacity: 0 }}
    >
      <NavLinks
        pathname={pathname}
        toggleMenu={toggleMenu}
        linksRef={linksRef}
      />
      <div
        onClick={toggleMenu}
        ref={themeToggleRef}
        className="mt-small pr-small opacity-0"
      >
        <ThemeToggle />
      </div>
    </nav>
  );
}

// NavLinks.tsx
