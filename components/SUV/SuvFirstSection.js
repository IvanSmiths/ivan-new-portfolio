import React, { useRef, useEffect, useContext } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import SrcImage from "../SrcImage";

function SuvFirstSection() {
  useEffect(() => {
    const element = refVideo.current;
    gsap.fromTo(
      element.querySelector("#video"),
      {
        scale: 1,
      },
      {
        scale: 1.45,

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

  return (
    <>
      <div
        ref={refVideo}
        className="case-studio__screen-image suv-first-section"
      >
        <div id="video">
          <SrcImage
            src={"/scholz-und-volkmer-website-2.jpg"}
            webp={"/scholz-und-volkmer-website-2.webp"}
            height={"926px"}
            width={"1900px"}
            alt={"image of a website"}
          />
        </div>
      </div>
      <div className="case-studio-description">
        <div className="case-studio-description__first-column">
          <h2 className="small-font">
            01 / <span>CONCEPTING</span>
          </h2>
          <h3 className="medium-font">
            A blend of UI and product engineering.
          </h3>
        </div>
        <div className="case-studio-description__second-column">
          <p>
            First concept, then design è il motto dell azienda. Ogni sito web
            partiva dal wireframing, il primo passaggio essenziale per dare al
            progetto delle solide basi. Ho usato Adobe XD per il wireframing, o
            durante un momento di ispirazione, usavo carta e penna. First
            concept, then design è il motto dell azienda. Ogni sito web partiva
            dal wireframing, il primo passaggio essenziale per dare al progetto
            delle solide basi
          </p>
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
