/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useContext, useRef } from "react";
import { gsap } from "gsap";
import { useRouter } from "next/router";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { CursorContext } from "../CursorManager";

const Hero = () => {
  let router = useRouter();
  // eslint-disable-next-line react-hooks/exhaustive-deps

  gsap.registerPlugin(ScrollTrigger);

  const refSec = useRef(null);
  const speedRef = useRef(null);
  const securityRef = useRef(null);
  const andRef = useRef(null);
  const arrowRef = useRef(null);
  const copyRef = useRef(null);
  const linkRef = useRef(null);

  useEffect(() => {
    const element = refSec.current;
    const fadeHero = gsap.fromTo(
      element.querySelector("#header"),
      {
        paddingBottom: 0,
        opacity: 1,
      },
      {
        paddingBottom: "22rem",
        opacity: 0,
        duration: 1,
        ease: "none",
        scrollTrigger: {
          trigger: element.querySelector("#header"),
          start: "350 top",
          end: "bottom top",
          ease: "power1",
          scrub: true,
        },
      }
    );
    var tl = gsap.timeline({});
    tl.fromTo(speedRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 });
    tl.fromTo(
      securityRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 }
    );
    tl.fromTo([andRef.current], { opacity: 0 }, { opacity: 1, duration: 0.5 });
    tl.fromTo(
      [copyRef.current, linkRef.current, arrowRef.current],
      { opacity: 0 },
      { opacity: 1, duration: 0.5 }
    );
    return () => {
      fadeHero.kill();
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
    <div ref={refSec} className="header__wrapper">
      <header
        id="header"
        style={{
          left: `${router.locale === "it" ? "3%" : ""}`,
        }}
        className="home-header-cnt"
      >
        <div className="big-font  title-1-cnt">
          <em ref={speedRef} className="title-1 ">
            {t("home:speed")}
          </em>
          <p ref={copyRef}>
            {t("home:header-title")} <br />
            {t("home:header-title-2")} <br />
            {t("home:header-title-3")}
          </p>
        </div>
        <div className="big-font  title-2-cnt">
          <Link href="/stuff" passHref>
            <a
              ref={linkRef}
              style={{
                padding: `${router.locale === "de" ? "50px 60px" : ""}`,
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="tiny-font absolute-small title-link btn-small-2"
            >
              {t("common:nav-stuff")}
            </a>
          </Link>
          <em ref={securityRef} className="title-2 impact">
            {t("home:security")}
          </em>
        </div>
        <div className="big-font  flex-center title-3-cnt">
          <em ref={andRef} className="title-3">
            {t("home:and")}
          </em>
          <svg
            ref={arrowRef}
            height="120px"
            width="100px"
            alt="arrow down"
            className="title-arrow"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 59.126 22.371"
          >
            <path
              id="Tracciato_22"
              data-name="Tracciato 22"
              d="M-4637.739,829.608l28.168,19.976,28.168-19.976"
              transform="translate(4639.134 -828.213)"
              fill="none"
              strokeLinecap="round"
              strokeWidth="1"
            />
          </svg>
        </div>
      </header>
    </div>
  );
};

export default Hero;
