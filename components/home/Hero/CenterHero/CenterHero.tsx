import { useRef, useState } from "react";
import { useTextSwap } from "../../../../utils/hooks/animations/useTextSwap";
import { dm_mono } from "../../../../utils/style/fonts/fonts";
import CompaniesLogo from "./CompaniesLogo";

const CenterHero = () => {
  const [hoveredCompany, setHoveredCompany] = useState<string | null>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useTextSwap(textRef, hoveredCompany, "Pioneers");

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
