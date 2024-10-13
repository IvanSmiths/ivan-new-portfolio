"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";

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
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLLIElement | null)[]>([]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!navRef.current) return;

    const navElement = navRef.current;
    const linkElements = linksRef.current.filter(
      (el): el is HTMLLIElement => el !== null,
    );

    if (isOpen) {
      gsap.to(navElement, { opacity: 1, duration: 0.3, ease: "power2.inOut" });
      gsap.fromTo(
        linkElements,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.2,
        },
      );
    } else {
      gsap.to(linkElements, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.in",
      });
      gsap.to(navElement, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
        delay: 0.2,
      });
    }
  }, [isOpen]);

  return (
    <>
      <button
        onClick={toggleMenu}
        className="visible fixed bottom-small right-small z-50 flex h-14 w-14 flex-col items-center justify-center gap-1 rounded-full bg-dark p-3.5 dark:bg-light lg:hidden"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? (
          <div className="relative h-full w-full">
            <span className="absolute left-1/2 top-1/2 h-0.5 w-full -translate-x-1/2 -translate-y-1/2 rotate-45 transform bg-light dark:bg-dark"></span>
            <span className="absolute left-1/2 top-1/2 h-0.5 w-full -translate-x-1/2 -translate-y-1/2 -rotate-45 transform bg-light dark:bg-dark"></span>
          </div>
        ) : (
          <>
            <span className="h-0.5 w-full bg-light dark:bg-dark"></span>
            <span className="h-0.5 w-full bg-light dark:bg-dark"></span>
          </>
        )}
      </button>

      <nav
        ref={navRef}
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-gray-900 text-white ${
          isOpen ? "" : "pointer-events-none"
        }`}
        style={{ opacity: 0 }}
      >
        <ul className="space-y-8 text-2xl">
          {navLinks.map((link, index) => (
            <li
              key={link.href}
              ref={(el: any) => (linksRef.current[index] = el)}
              style={{ opacity: 0 }}
            >
              <Link
                href={link.href}
                onClick={toggleMenu}
                className={`transition-colors hover:text-gray-300 ${
                  pathname === link.href ? "text-gray-500" : ""
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
