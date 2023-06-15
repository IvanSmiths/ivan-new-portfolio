/* eslint-disable @next/next/no-img-element */
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Head from "next/head";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import FooterSimple from "../components/FooterSimple";

const About = () => {
  let { t } = useTranslation();

  gsap.registerPlugin(ScrollTrigger);

  const refContainer = useRef(null);
  const refTextRoad = useRef(null);
  const ref2020 = useRef(null);
  const idCopyRef = useRef(null);
  const idImageRef = useRef(null);
  const firstWebsiteCopyRef = useRef(null);
  const firstWebsiteImageRef = useRef(null);
  const svCopyRef = useRef(null);
  const svImageRef = useRef(null);
  const ref2022 = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: refContainer.current,
          start: "top top",
          end: "19200 bottom",
          scrub: true,
          pin: true,
        },
      }).to(refTextRoad.current, {
        ease: "none",
        scale: 2,
        opacity: 0,
      }).to(ref2020.current, {
        keyframes: [
          {
            opacity: 1,
            scale: 1.5,
          },
          {
            opacity: 0,

            scale: 2,
          },
        ],
      }).fromTo(
        firstWebsiteImageRef.current,
        { opacity: 0 },
        {
          opacity: 1,
        }
      ).to(
        firstWebsiteCopyRef.current,

        {
          keyframes: [
            { opacity: 1, zIndex: 3 },
            {
              opacity: 0,
              delay: 1,
            },
          ],
        }
      ).to(firstWebsiteImageRef.current, {
        opacity: 0,
      }).to(idImageRef.current, {
        opacity: 1,
      }).to(
        idCopyRef.current,

        {
          keyframes: [
            { opacity: 1, zIndex: 4 },
            {
              opacity: 0,

              delay: 1,
            },
          ],
        }
      ).to(idImageRef.current, {
        opacity: 0,
      }).to(ref2022.current, {
        keyframes: [
          {
            opacity: 1,
            scale: 1.5,
          },
          {
            opacity: 0,

            scale: 2,
          },
        ],
      }).to(
        svCopyRef.current,
        {
          opacity: 1,
          zIndex: 5,
        }
      ).to(svImageRef.current, {
        keyframes: [{ opacity: 1 }, { opacity: 0, delay: 1 }],
      }).to(svCopyRef.current, {
        opacity: 0,
      })
    })
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Head>
        <title>{t("about:title")}</title>
        <meta
          name="description"
          content="Ivan Smiths, frontend web developer from Wiesbaden"
        />
      </Head>
      <header className="about__header">
        <div className="about-title-cnt">
          <h1 className="large-font impact">{t("about:title")}</h1>
        </div>
      </header>
      <main>
        <div ref={refContainer} className="about__container">
          <h2 ref={refTextRoad}>TIMELINE</h2>
          <h3 ref={ref2020}>2020</h3>
          <img
            ref={firstWebsiteImageRef}
            className="about__absolute-right about__opacity"
            src="/ivan-smiths-first-website.jpg"
            alt="first website"
            loading="lazy"
          />
          <div
            ref={firstWebsiteCopyRef}
            className="about__roadmap__copy about__absolute-left about__opacity"
          >
            <h4 className="small-font">01 / {t("about:passion")}</h4>
            <h5 className="medium-font">{t("about:journey")}</h5>
            <p>{t("about:journey-p")}</p>
            <div className="about__roadmap__copy-link">
              <a
                href="https://ivansmiths.netlify.app/"
                target="_blank"
                className="btn-small"
                rel="noreferrer noopener"
              >
                {t("about:see")}
              </a>
            </div>
          </div>
          <img
            ref={idImageRef}
            className="about__absolute-right about__opacity"
            src="/id-bottone.jpg"
            height="667px"
            width="375px"
            alt="image of a work"
            loading="lazy"
          />
          <div
            ref={idCopyRef}
            className="about__roadmap__copy about__absolute-left about__opacity"
          >
            <h4 className="small-font">02 / {t("about:design")}</h4>
            <h5 className="medium-font">{t("about:step")}</h5>
            <p>{t("about:step-p")}</p>
            <div className="about__roadmap__copy-link">
              <Link className="btn-small" href="/stuff/ideology">
                {t("about:see")}
              </Link>
            </div>
          </div>
          <h3 ref={ref2022}>2022</h3>
          <div
            ref={svCopyRef}
            className="about__roadmap__copy about__absolute-left about__opacity"
          >
            <h4 className="small-font">04 / {t("about:see")}</h4>
            <h5 className="medium-font">{t("about:rock")}</h5>
            <p>{t("about:rock-p")}</p>
            <div className="about__roadmap__copy-link">
              <Link className="btn-small" href="/stuff/scholz-und-volkmer">
                {t("about:see")}
              </Link>
            </div>
          </div>
          <img
            ref={svImageRef}
            className="about__absolute-right about__opacity"
            src="/scholz-und-volkmer-website-1.png"
            alt=" image of a work"
            loading="lazy"
          />
        </div>
      </main>
      <FooterSimple />
    </>
  );
};

export default About;
