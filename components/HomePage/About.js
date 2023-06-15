/* eslint-disable @next/next/no-img-element */
import React, { useRef, useEffect, useContext } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { CursorContext } from "../CursorManager";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import useTranslation from "next-translate/useTranslation";

function About() {
  gsap.registerPlugin(ScrollTrigger);
  const refAbout = useRef(null);

  useEffect(() => {
    const element2 = refAbout.current;
    const imageWidth = gsap.fromTo(
      element2.querySelector("#about-image-cnt"),
      {
        scale: 1,
      },
      {
        scale: 0.75,
        duration: 1,
        ease: "none",
        scrollTrigger: {
          trigger: element2.querySelector("#about-image-cnt"),
          start: "top bottom",
          end: "bottom top",
          ease: "power3",
          scrub: true,
        },
      }
    );
    return () => {
      imageWidth.kill();
    };
  }, []);

  const { setSize } = useContext(CursorContext);
  const handleMouseEnter = () => {
    setSize("medium");
  };
  const handleMouseLeave = () => {
    setSize("small");
  };

  let { t } = useTranslation();

  return (
    <main ref={refAbout} className="homepage-about-cnt skewElem">
      <p className="description">
        Ivan Smiths, <strong>{t("home:bio-2")}</strong>
        {t("home:bio-3")}
        <strong>{t("home:bio-4")}</strong>
        {t("home:bio-5")}
        <strong>{t("home:bio-6")}</strong>
        {t("home:bio-7")}
      </p>
      <div id="about-image-cnt" className="homepage-about-img-cnt">
        <picture className="flex-center">
          <source
            alt="me"
            decoding="async"
            height="908.75px"
            width="605.75px"
            srcSet="/photo-of-me.webp"
            type="image/webp"
          />
          <img
            alt="me"
            decoding="async"
            src="/photo-of-me.jpg"
            height="908.75px"
            width="605.75px"
          />
        </picture>
      </div>
      <div id="about" className="homepage-about-p-cnt">
        <div className="about">
          <div className="about-cnt">
            <h2 className="tiny-font ">ivan smiths</h2>
            <h3 className="medium-font">{t("home:about-desc")}</h3>
          </div>
          <p className="small-font">
            {t("home:about")}
            <br />
            <br />
            {t("home:about-p2")}
          </p>
        </div>
      </div>
      <div className="homepage-about-link">
        <Link className="btn-small btn-4 medium-font btn-5"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave} href="/about" passHref>

          {t("home:about-2")}
        </Link>
      </div>
    </main>
  );
}

export default About;
