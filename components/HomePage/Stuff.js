/* eslint-disable @next/next/no-img-element */
import React, { useRef, useEffect, useContext } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { CursorContext } from "../CursorManager";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import useTranslation from "next-translate/useTranslation";
import SrcImage from "../SrcImage";

function About() {
  gsap.registerPlugin(ScrollTrigger);
  const refAbout = useRef(null);

  const containerRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const pin = gsap.fromTo(
      containerRef.current,
      {
        translateX: 0,
      },
      {
        translateX: "-200vw",
        ease: "none",
        duration: 0.5,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "6000px top",
          scrub: 0.6,
          pin: true,
        },
      }
    );
    return () => {
      pin.kill();
    };
  }, []);

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
    <>
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
              <h2 className="tiny-font spacing">ivan smiths</h2>
              <h3 className="medium-font">{t("home:about-desc")}</h3>
            </div>
            <p className="small-font indent">
              {t("home:about")}
              <br />
              <br />
              {t("home:about-p2")}
            </p>
          </div>
        </div>
        <div className="homepage-about-link">
          <Link href="/about" passHref>
            <a
              className="btn-small btn-4 medium-font btn-5"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {t("home:about-2")}
            </a>
          </Link>
        </div>
      </main>
      <div>
        <section ref={triggerRef} className="scroll-container-outer">
          <div id="box" ref={containerRef} className="scroll-container ">
            <div id="box1" className="scroll-section-1 scroll-section">
              <div className="box-image-cnt">
                <Link href="/stuff/scholz-und-volkmer">
                  <a
                    onClick={handleMouseLeave}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <picture className="flex-center">
                      <source
                        alt="image of a work"
                        decoding="async"
                        height="750"
                        width="600"
                        srcSet="/scholz-und-volkmer-website-1.webp"
                        type="image/webp"
                      />
                      <img
                        alt="image of a work"
                        decoding="async"
                        src="/scholz-und-volkmer-website-1.jpg"
                        height="750"
                        width="600"
                      />
                    </picture>
                  </a>
                </Link>
              </div>
              <div className="box-informations-cnt">
                <div className="box__width">
                  <span className="small-font box-subtitle">
                    01 / {t("home:stuff-3")}
                    <br />
                  </span>
                  <Link href="/stuff/scholz-und-volkmer" passHref>
                    <a
                      className="medium-font box-title "
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      Scholz & Volkmer
                    </a>
                  </Link>
                  <ul>
                    <li>
                      {t("home:box-list")}
                      {t("home:box-list-dev")}
                    </li>
                    <li>
                      {t("home:box-list-2")}Vue.js, Nuxt.js,TypeScript, Gsap,
                      Sass
                    </li>
                    <li>2022 / {t("home:box-list-3")}</li>
                  </ul>
                  <div className="box-link-cnt">
                    <Link href="/stuff/scholz-und-volkmer" passHref>
                      <a className="btn-small box-link">{t("home:stuff")}</a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div id="box2" className="scroll-section-2 scroll-section">
              <div className="box-image-cnt">
                <Link href="/stuff/ideology">
                  <a
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <picture className="flex-center">
                      <source
                        alt="image of a work"
                        decoding="async"
                        height="750"
                        width="600"
                        srcSet="/ideology-website-mobile-4.webp"
                        type="image/webp"
                      />
                      <img
                        alt="image of a work"
                        decoding="async"
                        src="/ideology-website-mobile-4.jpg"
                        height="750"
                        width="600"
                      />
                    </picture>
                  </a>
                </Link>
              </div>
              <div className="box-informations-cnt">
                <div className="box__width">
                  <span className="small-font box-subtitle">
                    02 / {t("home:stuff-3")}
                    <br />
                  </span>
                  <Link href="/stuff/ideology" passHref>
                    <a
                      className="medium-font box-title"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      Ideology
                    </a>
                  </Link>
                  <ul>
                    <li>{t("home:box-list")}UI/UX Designer</li>
                    <li>
                      {t("home:box-list-2")}Adobe XD, CSS, jQuery, WordPress
                    </li>
                    <li>2020 / 2022</li>
                  </ul>
                  <div className="box-link-cnt ">
                    <Link href="/stuff/ideology" passHref>
                      <a
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className="btn-small box-link"
                      >
                        {t("home:stuff")}
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div id="box3" className="scroll-section-3 scroll-section">
              <div className="box-image-cnt">
                <Link href="/stuff/cg-prospect">
                  <a
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <picture className="flex-center">
                      <source
                        alt="image of a work"
                        decoding="async"
                        height="750"
                        width="600"
                        srcSet="/cgprospect.webp"
                        type="image/webp"
                      />
                      <img
                        alt="image of a work"
                        decoding="async"
                        src="/cgprospect.jpg"
                        height="750"
                        width="600"
                      />
                    </picture>
                  </a>
                </Link>
              </div>
              <div className="box-informations-cnt">
                <div className="box__width">
                  <span className="small-font box-subtitle">
                    03 / {t("home:stuff-4")}
                    <br />
                  </span>
                  <Link href="/stuff/cg-prospect" passHref>
                    <a
                      className="medium-font box-title"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      CG Prospect
                    </a>
                  </Link>
                  <ul>
                    <li>
                      {t("home:box-list")}
                      {t("home:box-list-dev-2")}, UI/UX Designer,{" "}
                      {t("home:box-list-mod")}
                    </li>
                    <li>
                      {t("home:box-list-2")}React (Next.js), MongoDB, CSS,
                      MetaShape
                    </li>
                    <li>2021 / {t("home:box-list-3")}</li>
                  </ul>
                  <div className="box-link-cnt">
                    <Link href="/stuff/cg-prospect" passHref>
                      <a
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className="btn-small box-link"
                      >
                        {t("home:stuff")}
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="caption__wrapper">
              <h3 className="caption-cnt impact large-font">
                {t("home:home-caption")}
              </h3>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default About;
