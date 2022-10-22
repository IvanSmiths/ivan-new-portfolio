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

  gsap.registerPlugin(ScrollTrigger);

  const firstRowRef = useRef(null);
  const secondRowRef = useRef(null);
  const thirdRowRef = useRef(null);
  const headerRef = useRef(null);
  const speedRef = useRef(null);
  const securityRef = useRef(null);
  const andRef = useRef(null);
  const arrowRef = useRef(null);
  const copyRef = useRef(null);
  const linkRef = useRef(null);

  useEffect(() => {
    var timeline = gsap.timeline({
      scrollTrigger: {
        trigger: headerRef.current,
        start: "350 top",
        end: "bottom top",
        ease: "power1",
        scrub: true,
      },
    });

    timeline.fromTo(
      headerRef.current,
      {
        opacity: 1,
      },
      {
        opacity: 0,
        duration: 1,
      },
      0
    );

    timeline.fromTo(
      firstRowRef.current,
      {
        translateX: 0,
      },
      {
        translateX: "-5rem",

        duration: 1,
      },
      0
    );
    timeline.fromTo(
      secondRowRef.current,
      {
        translateX: 0,
      },
      {
        translateX: "5rem",

        duration: 1,
      },
      0
    );
    timeline.fromTo(
      thirdRowRef.current,
      {
        translateX: 0,
      },
      {
        translateX: "-5rem",

        duration: 1,
      },
      0
    );

    var tl = gsap.timeline({});
    tl.fromTo(
      speedRef.current,
      { opacity: 0, translateY: 40 },
      { opacity: 1, translateY: 0, duration: 1 },
      0
    );
    tl.fromTo(
      securityRef.current,
      { opacity: 0, translateY: 40 },
      { opacity: 1, translateY: 0, duration: 1 },
      0.3
    );
    tl.fromTo(
      [andRef.current],
      { opacity: 0, translateY: 40 },
      { opacity: 1, translateY: 0, duration: 1 },
      0.5
    );
    tl.fromTo(
      [copyRef.current, linkRef.current, arrowRef.current],
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      1
    );
    return () => {
      timeline.kill();
      tl.kill();
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
    <div className="header__wrapper">
      <header
        ref={headerRef}
        style={{
          left: `${router.locale === "it" ? "3%" : ""}`,
        }}
        className="home-header-cnt"
      >
        <div ref={firstRowRef} className="big-font  title-1-cnt">
          <em ref={speedRef} className="title-1 ">
            {t("home:speed")}
          </em>
          <p ref={copyRef}>
            {t("home:header-title")} <br />
            {t("home:header-title-2")} <br />
            {t("home:header-title-3")}
          </p>
        </div>
        <div ref={secondRowRef} className="big-font  title-2-cnt">
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
        <div ref={thirdRowRef} className="big-font  flex-center title-3-cnt">
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
