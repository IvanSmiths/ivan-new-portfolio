/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useContext } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { CursorContext } from "../../components/CursorManager";
import { motion } from "framer-motion";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import Marquee from "../../components/Ideology/Marquee";
import { pageData } from "../../utils/sampleData";
import ProjectItem from "../../components/ProjectItem/ProjectItem";
import FooterIdeology from "../../components/Footers/FooterIdeology";
import IdCredits from "../../components/Ideology/IdCredits";
import IdHero from "../../components/Ideology/IdHero";
import IdInfo from "../../components/Ideology/IdInfo";
import IdExp from "../../components/Ideology/IdExp";
import IdRising from "../../components/Ideology/IdRising";
import IdFalling from "../../components/Ideology/IdFalling";
import IdClimax from "../../components/Ideology/IdClimax";
import IdDenouement from "../../components/Ideology/IdDenouement";
import SrcImage from "../../components/SrcImage";

const Ideology = () => {
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

  // MOUSE ZOOM HANDLER //
  const { setSize } = useContext(CursorContext);
  const handleMouseEnter = () => {
    setSize("medium");
  };
  const handleMouseLeave = () => {
    setSize("small");
  };

  let { t } = useTranslation();

  gsap.registerPlugin(ScrollTrigger);
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

  const refVideo = useRef(null);

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
      <header className="case-studio-header">
        <div className="case-studio-header__first-row">
          <div>
            <span className="small-font ">UI/UX Designer: (Adobe XD)</span>
            <h1 className="big-font impact">
              Ideology <br />
            </h1>
          </div>
          <Link href="/">
            <a
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
                <li className="bold">{t("ideology:tech")}</li>
                <li>{t("ideology:animation")} Adobe XD</li>
                <li>{t("ideology:frontend")} HTML, CSS, jQuery</li>
                <li>{t("ideology:style")} WooCommerce, Stripe, PayPal</li>
              </ul>
              <ul>
                <li className="bold">{t("ideology:date")}</li>
                <li>12/08/2020</li>
                <li>18/02/2022</li>
              </ul>
            </div>
            <div className="case-studio-header__second-row__first-list second-row__second-list">
              <ul>
                <li className="bold">Clients:</li>

                <li>
                  <a
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    href="https://lemonsoda.it/special-edition/"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Lemon Soda
                  </a>
                </li>
                <li>
                  <a
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    href="https://www.remax-primaclasse.it/"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Remax
                  </a>
                </li>
                <li>
                  <a
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    href="https://www.mabuprofumerie.it/"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    MABÙ
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="case-studio-header__second-row__image">
            <SrcImage
              src={"/ideology-website-1.jpg"}
              webp={"/ideology-website-1.webp"}
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
        Lorem ipsum dolor sit amet.
      </motion.h3>
      <div
        ref={refVideo}
        className="case-studio__screen-image case-studio__screen-video suv-first-section"
      >
        <div className="case-studio__video" id="video">
          <video muted autoPlay loop>
            <source src="/ideology.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
      <div className="case-studio-description">
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
      </div>
      <div className="climax-website-cnt skewElem">
        <ul className="climax-website">
          <motion.li
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0, y: 100 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex-center"
          >
            <SrcImage
              src={"/ideology-website-mobile-1.jpg"}
              webp={"/ideology-website-mobile-1.webp"}
              height={"130px"}
              width={"500px"}
              alt={"image"}
            />
          </motion.li>
          <motion.li
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0, y: 100 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex-center climax-website-margin"
          >
            <SrcImage
              src={"/ideology-website-mobile-2.jpg"}
              webp={"/ideology-website-mobile-2.webp"}
              height={"130px"}
              width={"500px"}
              alt={"image"}
            />
          </motion.li>
          <motion.li
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0, y: 100 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex-center"
          >
            <SrcImage
              src={"/ideology-website-mobile-13.jpg"}
              webp={"/ideology-website-mobile-13.webp"}
              height={"130px"}
              width={"500px"}
              alt={"image"}
            />
          </motion.li>
        </ul>
        <ul className="climax-website climax-website-2">
          <motion.li
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0, y: 100 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex-center"
          >
            <SrcImage
              src={"/ideology-website-mobile-4.jpg"}
              webp={"/ideology-website-mobile-4.webp"}
              height={"130px"}
              width={"500px"}
              alt={"image"}
            />
          </motion.li>
          <motion.li
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0, y: 100 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex-center climax-website-margin"
          >
            <SrcImage
              src={"/ideology-website-mobile-5.jpg"}
              webp={"/ideology-website-mobile-5.webp"}
              height={"130px"}
              width={"500px"}
              alt={"image"}
            />
          </motion.li>
          <motion.li
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0, y: 100 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex-center"
          >
            <SrcImage
              src={"/ideology-website-mobile-6.jpg"}
              webp={"/ideology-website-mobile-6.webp"}
              height={"130px"}
              width={"500px"}
              alt={"image"}
            />
          </motion.li>
        </ul>
      </div>
      <div className="case-studio-description">
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
      <Marquee />
      <div className="gallery-container" id="gallery-container"></div>
      <section>
        <div className="main-container skewElem" id="main-container">
          <ul>
            {pageData.map((project, index) => (
              <ProjectItem key={index} project={project} itemIndex={index} />
            ))}
            <span className="lines line-4"></span>
          </ul>
        </div>
      </section>
      <IdCredits skewElem="skewElem" />
      <FooterIdeology />
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
