import React from "react";
import useTranslation from "next-translate/useTranslation";
import SrcImage from "../SrcImage";

function IdTextImage() {
  let { t } = useTranslation();
  return (
    <>
      <div className="case-studio__images">
        <div className="case-studio__screen-image">
          <SrcImage
            classDiv="flex-center"
            src="/ideology-website-1.jpg"
            webp="/ideology-website-1.webp"
            height="755px"
            width="1424px"
            alt="image of a website"
          />
        </div>
        <div className="case-studio__screen-image">
          <SrcImage
            classDiv="flex-center"
            src="/ideology-website-6.jpg"
            webp="/ideology-website-6.webp"
            height="926px"
            width="1902px"
            alt="image of a website"
          />
        </div>
      </div>
      <div className="case-studio-description case-studio-description-first">
        <div className="case-studio-description__first-column">
          <h2 className="small-font">
            01 / <span> Design</span>
          </h2>
          <h3 className="medium-font">{t("ideology:cs-1-h")}</h3>
        </div>
        <div className="case-studio-description__second-column">
          <p>{t("ideology:cs-1-p")}</p>
        </div>
      </div>
    </>
  );
}

export default IdTextImage;