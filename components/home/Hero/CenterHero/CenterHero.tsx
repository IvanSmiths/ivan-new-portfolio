"use client";

import { useRef, useState } from "react";
import CompaniesLogo from "./CompaniesLogo";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { dm_mono } from "../../../../utils/fonts";

const CenterHero = () => {
  const [hoveredCompany, setHoveredCompany] = useState<string | null>(null);
  const animationContainerRef = useRef<HTMLDivElement>(null);
  const pioneersTextRef = useRef<HTMLDivElement>(null);
  const companyTextRef = useRef<HTMLDivElement>(null);
  const isInitialState = useRef(true);

  useGSAP(
    () => {
      const pioneersEl = pioneersTextRef.current;
      const companyEl = companyTextRef.current;

      if (!pioneersEl || !companyEl) return;

      gsap.killTweensOf([pioneersEl, companyEl]);

      if (hoveredCompany) {
        isInitialState.current = false;

        gsap.to(pioneersEl, {
          yPercent: 100,
          opacity: 0,
          duration: 0.35,
          ease: "power2.in",
        });

        companyEl.textContent = hoveredCompany;
        gsap.set(companyEl, { yPercent: -100, opacity: 0 });
        gsap.to(companyEl, {
          yPercent: 0,
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
          delay: 0.05,
        });
      } else {
        if (companyEl.textContent && !isInitialState.current) {
          gsap.to(companyEl, {
            yPercent: -100,
            opacity: 0,
            duration: 0.35,
            ease: "power2.in",
            onComplete: () => {
              companyEl.textContent = "";
            },
          });
        } else {
          gsap.set(companyEl, { yPercent: -100, opacity: 0, textContent: "" });
        }

        if (!isInitialState.current) {
          gsap.set(pioneersEl, { yPercent: 100, opacity: 0 });
          gsap.to(pioneersEl, {
            yPercent: 0,
            opacity: 1,
            duration: 0.35,
            ease: "power2.out",
            delay:
              companyEl.textContent ||
              // @ts-ignore
              gsap.getProperty(companyEl, "opacity") > 0
                ? 0.05
                : 0,
          });
        } else {
          gsap.set(pioneersEl, { yPercent: 0, opacity: 1 });
          gsap.set(companyEl, { yPercent: -100, opacity: 0, textContent: "" });
        }
      }
    },
    { dependencies: [hoveredCompany], scope: animationContainerRef },
  );

  return (
    <div className="flex flex-col items-start justify-start">
      <div
        className={`text-foreground-muted flex justify-center text-xs uppercase ${dm_mono.className}`}
      >
        Trusted by{" "}
        <div
          ref={animationContainerRef}
          className="relative ml-1 inline-block h-7 min-w-36 overflow-hidden text-center align-bottom"
        >
          <div
            ref={pioneersTextRef}
            className="absolute inset-0 flex h-full w-full"
          >
            Pioneers
          </div>
          <div
            ref={companyTextRef}
            className="absolute inset-0 flex h-full w-full"
          ></div>
        </div>
      </div>
      <CompaniesLogo onHover={setHoveredCompany} />
    </div>
  );
};

export default CenterHero;
