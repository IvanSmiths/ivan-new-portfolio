import React from "react";
import SrcImage from "../SrcImage";
import useTranslation from "next-translate/useTranslation";

function IdImageText() {
  let { t } = useTranslation();
  return (
    <div className="case-studio__images">
      <div className="case-studio__screen-image">
        <SrcImage
          src="/ideology-website-2.jpg"
          webp="/ideology-website-2.webp"
          height="755px"
          width="1424px"
          alt="image of a website"
        />
      </div>
      <div className="case-studio__screen-image">
        <SrcImage
          src="/ideology-website-3.jpg"
          webp="/ideology-website-3.webp"
          height="728px"
          width="1417px"
          alt="image of a website"
        />
      </div>
      <div className="case-studio-description">
        <div className="case-studio-description__first-column">
          <h2 className="small-font">
            01 / <span> Coding</span>
          </h2>
          <h3 className="medium-font">{t("ideology:cs-2-h")}</h3>
        </div>
        <div className="case-studio-description__second-column">
          <p>
            {t("ideology:cs-2-p")} <br /> <br />
            {t("ideology:cs-2-p-2")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default IdImageText;
