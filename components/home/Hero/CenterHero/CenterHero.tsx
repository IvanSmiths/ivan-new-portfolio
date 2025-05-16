"use client";

import { useState } from "react";
import CompaniesLogo from "./CompaniesLogo";

const CenterHero = () => {
  const [hoveredCompany, setHoveredCompany] = useState<string | null>(null);

  return (
    <div>
      <span>Trusted by {hoveredCompany || "Pioneers"}</span>
      <CompaniesLogo onHover={setHoveredCompany} />
    </div>
  );
};

export default CenterHero;
