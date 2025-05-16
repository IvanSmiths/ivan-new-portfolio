"use client";

import { useRef, useState } from "react";
import CompaniesLogo from "./CompaniesLogo";
import { dm_mono } from "../../../../utils/fonts";
import { useTextSwapAnimation } from "../../../../utils/hooks/useTextSwapAnimation";

const CenterHero = () => {
  const [hoveredCompany, setHoveredCompany] = useState<string | null>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useTextSwapAnimation(textRef, hoveredCompany, "Pioneers");

  return (
    <div
      className={`text-foreground-muted pb-1 text-xs uppercase ${dm_mono.className}`}
    >
      <p className="pb-1">
        Trusted by <span ref={textRef}>Pioneers</span>
      </p>

      <CompaniesLogo onHover={setHoveredCompany} />
    </div>
  );
};

export default CenterHero;
