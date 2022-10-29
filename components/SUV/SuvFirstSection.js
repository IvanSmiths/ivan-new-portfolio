import React from "react";
import useTranslation from "next-translate/useTranslation";
import Marquee from "../Ideology/Marquee";
import SrcImage from "../SrcImage";
import { pageData } from "../../utils/sampleData2";
import ProjectItem from "../../components/ProjectItem/ProjectItem";

function SuvFirstSection() {
  let { t } = useTranslation();

  return (
    <>
      <h3 className="case-studio__caption impact large-font">
        {t("suv:caption")}
      </h3>
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
      <div className="climax-website-cnt skewElem">
        <ul className="climax-website">
          <li className="flex-center">
            <SrcImage
              classDiv={"flex-center"}
              src={"/scholz-und-volkmer-website-mobile.jpg"}
              webp={"/scholz-und-volkmer-website-mobile.webp"}
              height={"834px"}
              width={"469px"}
              alt={"image"}
            />
          </li>
          <li className="flex-center climax-website-margin">
            <SrcImage
              classDiv={"flex-center"}
              src={"/scholz-und-volkmer-website-mobile-2.jpg"}
              webp={"/scholz-und-volkmer-website-mobile-2.webp"}
              height={"834px"}
              width={"469px"}
              alt={"image"}
            />
          </li>
          <li className="flex-center">
            <SrcImage
              classDiv={"flex-center"}
              src={"/scholz-und-volkmer-website-mobile-3.jpg"}
              webp={"/scholz-und-volkmer-website-mobile-3.webp"}
              height={"834px"}
              width={"469px"}
              alt={"image"}
            />
          </li>
        </ul>
        <ul className="climax-website climax-website-2">
          <li className="flex-center">
            <SrcImage
              classDiv={"flex-center"}
              src={"/scholz-und-volkmer-website-mobile-4.jpg"}
              webp={"/scholz-und-volkmer-website-mobile-4.webp"}
              height={"805px"}
              width={"469px"}
              alt={"image"}
            />
          </li>
          <li className="flex-center climax-website-margin">
            <SrcImage
              classDiv={"flex-center"}
              src={"/scholz-und-volkmer-website-mobile-5.jpg"}
              webp={"/scholz-und-volkmer-website-mobile-5.webp"}
              height={"805px"}
              width={"469px"}
              alt={"image"}
            />
          </li>
          <li className="flex-center">
            <SrcImage
              classDiv={"flex-center"}
              src={"/scholz-und-volkmer-website-mobile-6.jpg"}
              webp={"/scholz-und-volkmer-website-mobile-6.webp"}
              height={"834px"}
              width={"469px"}
              alt={"image"}
            />
          </li>
        </ul>
      </div>
      <Marquee />
      <div className="gallery-container" id="gallery-container"></div>
      <section>
        <div className="main-container skewElem" id="main-container">
          <ul>
            {pageData.map((project, index) => (
              <ProjectItem key={index} project={project} itemIndex={index} />
            ))}
            <span className="lines line-4"></span>
          </ul>
        </div>
      </section>
    </>
  );
}

export default SuvFirstSection;
