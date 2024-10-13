"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";
import ThemeToggle from "./ThemeToggle";

type NavLink = {
  href: string;
  label: string;
};

const navLinks: NavLink[] = [
  { href: "/crafts", label: "CRAFTS" },
  { href: "/blog", label: "BLOG" },
  { href: "/works", label: "WORKS" },
  { href: "/", label: "HOME" },
];

export default function NavbarMobile() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLLIElement | null)[]>([]);
  const themeToggleRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  useEffect((): void => {
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
    <>
      <button
        onClick={toggleMenu}
        className="visible fixed bottom-small right-small z-50 flex h-14 w-14 flex-col items-center justify-center gap-1 rounded-full bg-dark p-3.5 transition dark:bg-light md:hidden"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? (
          <div className="relative h-full w-full">
            <span className="absolute left-1/2 top-1/2 h-0.5 w-full -translate-x-1/2 -translate-y-1/2 rotate-45 transform bg-light transition dark:bg-dark"></span>
            <span className="absolute left-1/2 top-1/2 h-0.5 w-full -translate-x-1/2 -translate-y-1/2 -rotate-45 transform bg-light transition dark:bg-dark"></span>
          </div>
        ) : (
          <>
            <span className="h-0.5 w-full bg-light transition dark:bg-dark"></span>
            <span className="h-0.5 w-full bg-light transition dark:bg-dark"></span>
          </>
        )}
      </button>
      <nav
        ref={navRef}
        className={`fixed inset-0 z-40 flex flex-col items-end justify-center bg-light transition dark:bg-dark ${
          isOpen ? "" : "pointer-events-none"
        }`}
        style={{ opacity: 0 }}
      >
        <ul className="flex w-full flex-col gap-small text-2xl">
          {navLinks.map((link: NavLink, index: number) => (
            <li
              key={link.href}
              ref={(el: HTMLLIElement | null): void => {
                linksRef.current[index] = el;
              }}
              style={{ opacity: 0 }}
              className="flex w-full flex-col items-end gap-small"
            >
              <span className="bg-darkSecondary dark:bg-lightSecondary w-full p-[1px]"></span>
              <Link
                href={link.href}
                onClick={toggleMenu}
                className={`pr-small text-7xl ${
                  pathname === link.href
                    ? "text-darkSecondary dark:text-lightSecondary"
                    : "text-dark dark:text-light"
                }`}
              >
                {link.label}
              </Link>
              {index === 3 && (
                <span className="bg-darkSecondary dark:bg-lightSecondary w-full p-[1px]"></span>
              )}
            </li>
          ))}
        </ul>
        <div
          onClick={toggleMenu}
          ref={themeToggleRef}
          className="mt-small pr-small opacity-0"
        >
          <ThemeToggle />
        </div>
      </nav>
    </>
  );
}
