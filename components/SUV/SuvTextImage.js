import React from "react";
import useTranslation from "next-translate/useTranslation";
import SrcImage from "../SrcImage";

function SuvTextImage() {
  let { t } = useTranslation();

  return (
    <>
      <div className="case-studio__images">
        <div className="case-studio__screen-image">
          <SrcImage
            classDiv={"flex-center"}
            src={"/scholz-und-volkmer-website-3.jpg"}
            webp={"/scholz-und-volkmer-website-3.webp"}
            height={"970px"}
            width={"1920px"}
            alt={"image of a website"}
          />
        </div>
        <div className="case-studio__screen-image">
          <SrcImage
            classDiv={"flex-center"}
            src={"/scholz-und-volkmer-website-4.jpg"}
            webp={"/scholz-und-volkmer-website-4.webp"}
            height={"1043px"}
            width={"1920px"}
            alt={"image of a website"}
          />
        </div>
      </div>
      <div className="case-studio-description case-studio-description-first">
        <div className="case-studio-description__first-column">
          <h2 className="small-font">
            01 / <span>{t("suv:case-studio-1-header")}</span>
          </h2>
          <h3 className="medium-font">{t("suv:case-studio-1-headline")}</h3>
        </div>
        <div className="case-studio-description__second-column">
          <p>{t("suv:case-studio-1-paragraph")}</p>
        </div>
      </div>
    </>
  );
}

export default SuvTextImage;
