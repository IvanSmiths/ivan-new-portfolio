/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useContext, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import Link from "next/link";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { CursorContext } from "../../components/CursorManager";
import SrcImage from "../../components/SrcImage";
import Head from "next/head";
import FooterCgProspect from "../../components/Footers/FooterCgProspect";
import CgHero from "../../components/CGProspect/CgHero";
import CgInfo from "../../components/CGProspect/CgInfo";
import CgExp from "../../components/CGProspect/CgExp";
import CgRising from "../../components/CGProspect/CgRising";
import CgClimax from "../../components/CGProspect/CgClimax";
import CgFalling from "../../components/CGProspect/CgFalling";
import CgDenouement from "../../components/CGProspect/CgDenouement";
import CgCredits from "../../components/CGProspect/CgCredits";

const Ideology = () => {
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
          scrub: true,
        },
      }
    );
  }, []);
  // SKEW
  useEffect(() => {
    let proxy = { skew: 0 },
      skewSetter = gsap.quickSetter(".skewElem", "skewY", "deg"),
      clamp = gsap.utils.clamp(-0.5, 0.5);

    ScrollTrigger.create({
      onUpdate: (self) => {
        let skew = clamp(self.getVelocity() / -2);
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew;
          gsap.to(proxy, {
            skew: 0,
            duration: 0.5,
            ease: "circ",
            overwrite: true,
            onUpdate: () => skewSetter(proxy.skew),
          });
        }
      },
    });
    gsap.set(".skewElem", { transformOrigin: "right center", force3D: true });
  }, []);
  const [isDesktop, setDesktop] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 768) {
      setDesktop(true);
    } else {
      setDesktop(false);
    }

    const updateMedia = () => {
      if (window.innerWidth > 768) {
        setDesktop(true);
      } else {
        setDesktop(false);
      }
    };
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  gsap.registerPlugin(ScrollTrigger);

  // MOUSE ZOOM HANDLER //
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
      <header className="case-studio-header">
        <div className="case-studio-header__first-row">
          <div>
            <span className="small-font ">
              {t("cg-prospect:header")} React.js (Next.js)
            </span>
            <h1 className="big-font impact">
              CG Prospect <br />
            </h1>
          </div>
          <Link href="https://www.cgprospect.com/">
            <a
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="case-studio-header__link btn-small"
            >
              website
            </a>
          </Link>
        </div>
        <div className="case-studio-header__second-row">
          <div>
            <div className="case-studio-header__second-row__first-list">
              <ul>
                <li className="bold">{t("cg-prospect:tech")}</li>
                <li>{t("cg-prospect:frontend")}React.js (Next.js)</li>
                <li>Backend: PostgreSQL (Prisma)</li>
                <li>{t("cg-prospect:style")}CSS</li>
              </ul>
              <ul>
                <li className="bold">{t("cg-prospect:date")}</li>
                <li>11/06/2021</li>
                <li>{t("cg-prospect:current")}</li>
              </ul>
            </div>
            <div className="case-studio-header__second-row__first-list second-row__second-list"></div>
          </div>
          <div className="case-studio-header__second-row__image">
            <SrcImage
              src={"/cg-prospect-website-1.jpg"}
              webp={"/cg-prospect-website-1.webp"}
              height={"926px"}
              width={"1900px"}
              alt={"image"}
            />
          </div>
        </div>
      </header>
      <motion.h3
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        variants={{
          hidden: { opacity: 0, y: 100 },
          visible: { opacity: 1, y: 0 },
        }}
        className="case-studio__caption impact large-font"
      >
        {t("cg-prospect:caption")}
      </motion.h3>
      <div
        ref={refVideo}
        className="case-studio__screen-image case-studio__screen-video suv-first-section"
      >
        <div className="case-studio__video" id="video">
          {isDesktop ? (
            <video muted autoPlay loop>
              <source src="/cg-prospect.mp4" type="video/mp4" />
            </video>
          ) : (
            <video muted autoPlay loop>
              <source src="/cg-prospect-mobile.mp4" type="video/mp4" />
            </video>
          )}
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
    props: { load: "load" }, // will be passed to the page component as props
  };
}

function waitload(sec) {
  return new Promise((resolve) => setTimeout(resolve, sec * 300));
}

export default Ideology;
