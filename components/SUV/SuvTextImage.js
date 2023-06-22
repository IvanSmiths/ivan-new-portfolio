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
            classDiv="flex-center"
            src="/scholz-und-volkmer-website-3.jpg"
            webp="/scholz-und-volkmer-website-3.webp"
            height="970px"
            width="1920px"
            alt="image of a website"
          />
        </div>
        <div className="case-studio__screen-image">
          <SrcImage
            classDiv="flex-center"
            src="/scholz-und-volkmer-website-4.jpg"
            webp="/scholz-und-volkmer-website-4.webp"
            height="1043px"
            width="1920px"
            alt="image of a website"
          />
        </div>
      </div>
      <div className="case-studio-description case-studio-description-first">
        <div className="case-studio-description__first-column">
          <h2 className="small-font">
            01 / <span> Gsap</span>
          </h2>
          <h3 className="medium-font">Animations, animations... animations!</h3>
        </div>
        <div className="case-studio-description__second-column">
          <p>
            As soon as i joined S&V, my firsts Jira tickets were about dealing with animations. Using Gsap, i managed to code animations that are curently in production website like in the {" "}
            <a
              className="bold"
              href="https://perfection.wmf.com/de/perfection/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Wmf one.
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default SuvTextImage;
