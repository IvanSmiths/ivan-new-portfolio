/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import useTranslation from "next-translate/useTranslation";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import SrcImage from "../../components/SrcImage";
import Head from "next/head";
import CgHero from "../../components/CgProspect/CgHero";

const Ideology = () => {
  gsap.registerPlugin(ScrollTrigger);

  const refVideo = useRef(null);

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
          ease: "power3",
          scrub: 1,
        },
      }
    );
  }, []);

  let { t } = useTranslation();

  return (
    <>
      <Head>
        <title>Ivan Smiths | CG Prospect case studio</title>
        <meta
          name="description"
          content="I have built CG Prospect, a really fast website about 3d modeling."
        />
        <meta
          property="og:description"
          content="CG Prospect case studio. A really fast website about 3d modeling coded with Next.js"
        />
        <meta
          property="og:image"
          content="https://www.ivansmiths.com/cg-prospect-website-1.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@IvanSmiths" />
        <meta
          name="twitter:title"
          content="Ivan Smiths | CG Prospect case studio"
        />
        <meta
          name="twitter:description"
          content="CG Prospect case studio. A really fast website about 3d modeling coded with Next.js"
        />
        <meta
          name="twitter:image"
          content="https://www.ivansmiths.com/ideology.jpg"
        />
        <meta
          name="twitter:image:alt"
          content="preview of CG Prospect case studio"
        />
      </Head>
      <CgHero />
      <h3 className="case-studio__caption impact large-font">
        {t("cg-prospect:caption")}
      </h3>
      <div
        ref={refVideo}
        className="case-studio__screen-image case-studio__screen-video suv-first-section"
      >
        <div className="case-studio__video" id="video">
          <video muted autoPlay loop>
            <source src="/cg-prospect.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
      <div className="case-studio-description case-studio-description-first">
        <div className="case-studio-description__first-column">
          <h2 className="small-font">
            01 / <span>{t("cg-prospect:case-studio-1-header")}</span>
          </h2>
          <h3 className="medium-font">
            {t("cg-prospect:case-studio-1-headline")}
          </h3>
        </div>
        <div className="case-studio-description__second-column">
          <p>{t("cg-prospect:case-studio-1-paragraph")}</p>
        </div>
      </div>
      <div className="case-studio__images">
        <div className="case-studio__screen-image">
          <SrcImage
            src={"/cg-prospect-website-2.jpg"}
            webp={"/cg-prospect-website-2.webp"}
            height={"926px"}
            width={"1900px"}
            alt={"image of a website"}
          />
        </div>
        <div className="case-studio__screen-image">
          <SrcImage
            src={"/cg-prospect-website-3.jpg"}
            webp={"/cg-prospect-website-3.webp"}
            height={"926px"}
            width={"1900px"}
            alt={"image of a website"}
          />
        </div>
      </div>
    </>
  );
};
export async function getServerSideProps(context) {
  await waitload(2);
  return {
    props: { load: "load" },
  };
}

function waitload(sec) {
  return new Promise((resolve) => setTimeout(resolve, sec * 300));
}

export default Ideology;
