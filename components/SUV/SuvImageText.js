import React from "react";
import useTranslation from "next-translate/useTranslation";
import SrcImage from "../SrcImage";

function SuvTextImage() {
  let { t } = useTranslation();

  return (
    <>
      <div className="case-studio-description case-studio-description-first">
        <div className="case-studio-description__first-column">
          <h2 className="small-font">
            02 / <span>TypeScript</span>
          </h2>
          <h3 className="medium-font">{t("suv:cs-1-h")}</h3>
        </div>
        <div className="case-studio-description__second-column">
          <p>{t("suv:cs-1-p")}</p>
        </div>
      </div>
      <div className="case-studio__images">
        <div className="case-studio__screen-image">
          <SrcImage
            classDiv="flex-center"
            src="/scholz-und-volkmer-website-5.jpg"
            webp="/scholz-und-volkmer-website-5.webp"
            height="929px"
            width="1902px"
            alt="image of a website"
          />
        </div>
        <div className="case-studio__screen-image">
          <SrcImage
            classDiv="flex-center"
            src="/scholz-und-volkmer-website-6.jpg"
            webp="/scholz-und-volkmer-website-6.webp"
            height="929px"
            width="1920px"
            alt="image of a website"
          />
        </div>
        <div className="case-studio__screen-image">
          <SrcImage
            classDiv="flex-center"
            src="/scholz-und-volkmer-website-7.jpg"
            webp="/scholz-und-volkmer-website-7.webp"
            height="929px"
            width="1902px"
            alt="image of a website"
          />
        </div>
      </div>
    </>
  );
}

export default SuvTextImage;
