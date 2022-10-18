/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import Marquee from "../../components/Ideology/Marquee";
import { pageData } from "../../utils/sampleData";
import ProjectItem from "../../components/ProjectItem/ProjectItem";
import SrcImage from "../../components/SrcImage";
import IdHero from "../../components/Ideology/IdHero";
import Footer from "../../components/Footer";
import FooterSimple from "../../components/FooterSimple";

const Ideology = () => {
  gsap.registerPlugin(ScrollTrigger);

  let { t } = useTranslation();
  const videoIdRef = useRef(null);
  const videoIdTriggerRef = useRef(null);

  useEffect(() => {
    const vidIdAnim = gsap.fromTo(
      videoIdRef.current,
      {
        scale: 0.5,
      },
      {
        scale: 1,

        duration: 1,
        ease: "none",
        scrollTrigger: {
          pin: true,
          trigger: videoIdTriggerRef.current,
          start: "center center",
          end: "+=1200px top",
          ease: "power3",
          scrub: 1,
        },
      }
    );
    return () => {
      vidIdAnim.kill();
    };
  }, []);

  const [isDesktop, setDesktop] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 500) {
      setDesktop(true);
    } else {
      setDesktop(false);
    }

    const updateMedia = () => {
      if (window.innerWidth > 500) {
        setDesktop(true);
      } else {
        setDesktop(false);
      }
    };
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  return (
    <>
      <Head>
        <title>Ivan Smiths | Ideology case studio</title>
        <meta
          name="description"
          content="Ivan Smiths | Ideology case studio. UI/UX Designer using Adobe XD for two years"
        />
        <meta
          property="og:description"
          content="Ideology case studio. UI/UX Designer using Adobe XD for two years"
        />
        <meta
          property="og:image"
          content="https://www.ivansmiths.com/ideology.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@IvanSmiths" />
        <meta
          name="twitter:title"
          content="Ivan Smiths | Ideology case studio"
        />
        <meta
          name="twitter:description"
          content="Ideology case studio. UI/UX Designer using Adobe XD for two years"
        />
        <meta
          name="twitter:image"
          content="https://www.ivansmiths.com/ideology.jpg"
        />
        <meta
          name="twitter:image:alt"
          content="preview of Ideology case studio"
        />
      </Head>
      <IdHero />
      <h3 className="case-studio__caption impact large-font">
        {t("ideology:caption")}
      </h3>
      <div className="case-studio__screen-image case-studio__screen-video suv-first-section">
        <div ref={videoIdTriggerRef} className="case-studio__video" id="video">
          <video
            ref={videoIdRef}
            preload="none"
            poster="/ideology-website-2.jpg"
            muted
            autoPlay
            loop
          >
            <source src="/ideology.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
      <div className="case-studio-description case-studio-description-first">
        <div className="case-studio-description__first-column">
          <h2 className="small-font">
            01 / <span>{t("ideology:case-studio-1-header")}</span>
          </h2>
          <h3 className="medium-font">
            {t("ideology:case-studio-1-headline")}
          </h3>
        </div>
        <div className="case-studio-description__second-column">
          <p>{t("ideology:case-studio-1-paragraph")}</p>
        </div>
      </div>
      <div className="case-studio__images">
        <div className="case-studio__screen-image">
          <SrcImage
            src={"/ideology-website-2.jpg"}
            webp={"/ideology-website-2.webp"}
            height={"926px"}
            width={"1900px"}
            alt={"image of a website"}
          />
        </div>
        <div className="case-studio__screen-image">
          <SrcImage
            src={"/ideology-website-3.jpg"}
            webp={"/ideology-website-3.webp"}
            height={"926px"}
            width={"1900px"}
            alt={"image of a website"}
          />
        </div>
        <div className="case-studio-description">
          <div className="case-studio-description__first-column">
            <h2 className="small-font">
              01 / <span>{t("ideology:case-studio-2-header")}</span>
            </h2>
            <h3 className="medium-font">
              {t("ideology:case-studio-2-headline")}
            </h3>
          </div>
          <div className="case-studio-description__second-column">
            <p>
              {t("ideology:case-studio-2-paragraph")} <br /> <br />
              {t("ideology:case-studio-2-paragraph-2")}
            </p>
          </div>
        </div>
      </div>
      <div className="climax-website-cnt">
        <ul className="climax-website">
          <li className="flex-center">
            <SrcImage
              src={"/ideology-website-mobile-1.jpg"}
              webp={"/ideology-website-mobile-1.webp"}
              height={"681px"}
              width={"428px"}
              alt={"image"}
            />
          </li>
          <li className="flex-center climax-website-margin">
            <SrcImage
              src={"/ideology-website-mobile-2.jpg"}
              webp={"/ideology-website-mobile-2.webp"}
              height={"555px"}
              width={"344px"}
              alt={"image"}
            />
          </li>
          <li className="flex-center">
            <SrcImage
              src={"/ideology-website-mobile-13.jpg"}
              webp={"/ideology-website-mobile-13.webp"}
              height={"744px"}
              width={"390px"}
              alt={"image"}
            />
          </li>
        </ul>
        <ul className="climax-website climax-website-2">
          <li className="flex-center">
            <SrcImage
              src={"/ideology-website-mobile-4.jpg"}
              webp={"/ideology-website-mobile-4.webp"}
              height={"572px"}
              width={"343px"}
              alt={"image"}
            />
          </li>
          <li className="flex-center climax-website-margin">
            <SrcImage
              src={"/ideology-website-mobile-5.jpg"}
              webp={"/ideology-website-mobile-5.webp"}
              height={"572px"}
              width={"342px"}
              alt={"image"}
            />
          </li>
          <li className="flex-center">
            <SrcImage
              src={"/ideology-website-mobile-6.jpg"}
              webp={"/ideology-website-mobile-6.webp"}
              height={"573px"}
              width={"353px"}
              alt={"image"}
            />
          </li>
        </ul>
      </div>
      <Marquee />
      <div className="gallery-container" id="gallery-container"></div>
      <section>
        <div className="main-container " id="main-container">
          <ul>
            {pageData.map((project, index) => (
              <ProjectItem key={index} project={project} itemIndex={index} />
            ))}
            <span className="lines line-4"></span>
          </ul>
        </div>
      </section>
      {isDesktop ? (
        <Footer link={"stuff/cg-prospect"} />
      ) : (
        <FooterSimple text="Cg Prospect" link="/stuff/cg-prospect" />
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  await waitload(1);
  return {
    props: { load: "load" },
  };
}

function waitload(sec) {
  return new Promise((resolve) => setTimeout(resolve, sec * 100));
}

export default Ideology;
