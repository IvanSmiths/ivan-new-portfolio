import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { RefObject } from "react";

export function useNavFade({
  isOpen,
  navRef,
  linksRef,
  themeToggleRef,
}: {
  isOpen: boolean;
  navRef: RefObject<HTMLDivElement | null>;
  linksRef: RefObject<(HTMLLIElement | null)[]>;
  themeToggleRef: RefObject<HTMLDivElement | null>;
}) {
  useGSAP(
    () => {
      if (!navRef.current) return;

      const navElement = navRef.current;
      const linkElements = linksRef.current.filter(
        (el): el is HTMLLIElement => el !== null,
      );

      if (isOpen) {
        gsap.to(navElement, {
          opacity: 1,
          duration: 0.2,
          ease: "power2.inOut",
        });
        gsap.fromTo(
          linkElements,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            stagger: 0.1,
            ease: "power2.out",
          },
        );
        gsap.to(themeToggleRef.current, {
          opacity: 1,
          y: 0,
          delay: 0.3,
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
          delay: 0.4,
        });
      }
    },
    { dependencies: [isOpen], scope: navRef },
  );
}
