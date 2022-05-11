import React, { useContext, useEffect, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import { CursorContext } from "../../components/CursorManager";

const CgCredits = () => {
  // MOUSE ZOOM HANDLER //
  const { setSize } = useContext(CursorContext);
  const handleMouseEnter = () => {
    setSize("medium");
  };
  const handleMouseLeave = () => {
    setSize("small");
  };

  let { t } = useTranslation();
  return (
    <section className="credits-cnt flex-center skewElem">
      <h3 className="large-font spacing">{t("cg-prospect:credits")}</h3>
      <div className="credits-card-cnt flex-center">
        <ul className="credits-card">
          <li className="credits-card-title">{t("cg-prospect:softwares")}</li>
          <li>
            {t("cg-prospect:photogrammetry")}:{" "}
            <a
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.agisoft.com/"
            >
              Agisoft Metashape
            </a>
          </li>
          <li>
            Rendering:{" "}
            <a
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.blender.org/"
            >
              Blender
            </a>
          </li>
          <li>
            {t("cg-prospect:mesh")}:{" "}
            <a
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              target="_blank"
              rel="noopener noreferrer"
              href="https://pixologic.com/"
            >
              Zbrush
            </a>
          </li>
          <li>
            Baking:{" "}
            <a
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              target="_blank"
              rel="noopener noreferrer"
              href="https://pixologic.com/"
            >
              Zbrush
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default CgCredits;
