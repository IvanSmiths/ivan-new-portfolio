import React from "react";
import SrcImage from "../SrcImage";
import useTranslation from "next-translate/useTranslation";

function CgImageText() {
  let { t } = useTranslation();
  return (
    <>
      <div className="case-studio-description case-studio-description-first">
        <div className="case-studio-description__first-column">
          <h2 className="small-font">
            01 / <span> Performances</span>
          </h2>
          <h3 className="medium-font">{t("cg-prospect:cs-1-h")}</h3>
        </div>
        <div className="case-studio-description__second-column">
          <p>{t("cg-prospect:cs-1-p")}</p>
        </div>
      </div>
      <div className="case-studio__images">
        <div className="case-studio__screen-image">
          <SrcImage
            src="/cg-prospect-website-2.jpg"
            webp="/cg-prospect-website-2.webp"
            height="756px"
            width="1440px"
            alt="image of a website"
          />
        </div>
        <div className="case-studio__screen-image">
          <SrcImage
            src="/cg-prospect-website-3.jpg"
            webp="/cg-prospect-website-3.webp"
            height="755px"
            width="1440px"
            alt="image of a website"
          />
        </div>
      </div>
    </>
  );
}

export default CgImageText;
