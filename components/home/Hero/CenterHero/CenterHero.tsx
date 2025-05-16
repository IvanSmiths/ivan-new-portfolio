"use client";

import { useRef, useState } from "react";
import CompaniesLogo from "./CompaniesLogo";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { dm_mono } from "../../../../utils/fonts";

const CenterHero = () => {
  const [hoveredCompany, setHoveredCompany] = useState<string | null>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const isInitialState = useRef(true);

  useGSAP(
    () => {
      const el = textRef.current;
      if (!el) return;

      gsap.killTweensOf(el);
      gsap.to(el, {
        opacity: 0,
        filter: "blur(4px)",
        duration: 0.2,
        ease: "power2.out",
        onComplete: () => {
          el.textContent = hoveredCompany || "Pioneers";

          gsap.fromTo(
            el,
            { opacity: 0, filter: "blur(4px)" },
            {
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.3,
              ease: "power2.out",
            },
          );
        },
      });

      if (hoveredCompany) {
        isInitialState.current = false;
      }
    },
    { dependencies: [hoveredCompany] },
  );

  return (
    <div className="flex flex-col items-start justify-start">
      <div
        className={`text-foreground-muted text-xs uppercase ${dm_mono.className}`}
      >
        Trusted by <span ref={textRef}>Pioneers</span>
      </div>
      <CompaniesLogo onHover={setHoveredCompany} />
    </div>
  );
};

export default CenterHero;
