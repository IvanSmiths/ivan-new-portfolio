import React, { useRef, useEffect, useContext } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import useTranslation from "next-translate/useTranslation";
import SrcImage from "../SrcImage";

function SuvFirstSection() {
  useEffect(() => {
    const element = refVideo.current;
    gsap.fromTo(
      element.querySelector("#video"),
      {
        scale: 0.5,
      },
      {
        scale: 1,

        duration: 1,
        ease: "none",
        scrollTrigger: {
          pin: true,
          trigger: element.querySelector("#video"),
          start: "center center",
          end: "+=1200px top",
          markers: true,
          ease: "power3",
          scrub: true,
        },
      }
    );
  }, []);

  const refVideo = useRef(null);
  let { t } = useTranslation();

  return (
    <>
      <div
        ref={refVideo}
        className="case-studio__screen-image case-studio__screen-video suv-first-section"
      >
        <div className="case-studio__video" id="video">
          <video muted autoPlay loop>
            <source src="/wmf.webm" type="video/mp4" />
          </video>
        </div>
      </div>
      <div className="case-studio-description">
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
            src={"/scholz-und-volkmer-website-2.jpg"}
            webp={"/scholz-und-volkmer-website-2.webp"}
            height={"926px"}
            width={"1900px"}
            alt={"image of a website"}
          />
        </div>
        <div className="case-studio__screen-image">
          <SrcImage
            src={"/scholz-und-volkmer-website-2.jpg"}
            webp={"/scholz-und-volkmer-website-2.webp"}
            height={"926px"}
            width={"1900px"}
            alt={"image of a website"}
          />
        </div>
        <div className="case-studio__screen-image">
          <SrcImage
            src={"/scholz-und-volkmer-website-2.jpg"}
            webp={"/scholz-und-volkmer-website-2.webp"}
            height={"926px"}
            width={"1900px"}
            alt={"image of a website"}
          />
        </div>
        <div className="case-studio__screen-image">
          <SrcImage
            src={"/scholz-und-volkmer-website-2.jpg"}
            webp={"/scholz-und-volkmer-website-2.webp"}
            height={"926px"}
            width={"1900px"}
            alt={"image of a website"}
          />
        </div>
        <div className="case-studio__screen-image">
          <SrcImage
            src={"/scholz-und-volkmer-website-2.jpg"}
            webp={"/scholz-und-volkmer-website-2.webp"}
            height={"926px"}
            width={"1900px"}
            alt={"image of a website"}
          />
        </div>
      </div>
    </>
  );
}

export default SuvFirstSection;
