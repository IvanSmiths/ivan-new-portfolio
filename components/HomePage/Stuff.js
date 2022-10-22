/* eslint-disable @next/next/no-img-element */
import React, { useRef, useEffect, useContext } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { CursorContext } from "../CursorManager";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import useTranslation from "next-translate/useTranslation";
import SrcImage from "../SrcImage";

function Stuff() {
  gsap.registerPlugin(ScrollTrigger);

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

  const { setSize } = useContext(CursorContext);
  const handleMouseEnter = () => {
    setSize("medium");
  };
  const handleMouseLeave = () => {
    setSize("small");
  };

  let { t } = useTranslation();

  return (
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
                  <SrcImage
                    className="flex-center"
                    src="/scholz-und-volkmer-website-1.jpg"
                    webp="/scholz-und-volkmer-website-1.webp"
                    height="563"
                    width="337"
                    alt="s-v work"
                    lazyOff={true}
                  />
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
                    {t("home:box-list-2")}Vue.js, Nuxt.js,TypeScript, Gsap, Sass
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
                  <SrcImage
                    className="flex-center"
                    src="/ideology-website-mobile-4.jpg"
                    webp="/ideology-website-mobile-4.webp"
                    height="572"
                    width="343"
                    alt="ideology work"
                    lazyOff={true}
                  />
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
                  <SrcImage
                    className="flex-center"
                    src="/cgprospect.jpg"
                    webp="/cgprospect.webp"
                    height="637"
                    width="448"
                    alt="ideology work"
                    lazyOff={true}
                  />
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
  );
}

export default Stuff;
