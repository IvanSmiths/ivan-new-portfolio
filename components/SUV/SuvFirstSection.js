import React, { useRef, useEffect, useContext, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import useTranslation from "next-translate/useTranslation";
import Marquee from "../Ideology/Marquee";
import SrcImage from "../SrcImage";
import { pageData } from "../../utils/sampleData2";
import ProjectItem from "../../components/ProjectItem/ProjectItem";

function SuvFirstSection() {
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
  let { t } = useTranslation();

  return (
    <>
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
        {t("suv:caption")}
      </motion.h3>
      <div
        ref={refVideo}
        className="case-studio__screen-image case-studio__screen-video suv-first-section"
      >
        <div className="case-studio__video" id="video">
          {isDesktop ? (
            <video
              preload="none"
              poster="scholz-und-volkmer-website-2.jpg"
              muted
              autoPlay
              loop
            >
              <source src="/suv.mp4" type="video/mp4" />
            </video>
          ) : (
            <video
              preload="none"
              poster="/scholz-und-volkmer-website-1.png"
              muted
              autoPlay
              loop
            >
              <source src="/suv-mobile.mp4" type="video/mp4" />
            </video>
          )}
        </div>
      </div>
      <div className="case-studio-description case-studio-description-first">
        <div className="case-studio-description__first-column">
          <h2 className="small-font">
            01 / <span>{t("suv:case-studio-1-header")}</span>
          </h2>
          <h3 className="medium-font">{t("suv:case-studio-1-headline")}</h3>
        </div>
        <div className="case-studio-description__second-column">
          <p>{t("suv:case-studio-1-paragraph")}</p>
        </div>
      </div>
      <div className="case-studio__images">
        <div className="case-studio__screen-image">
          <SrcImage
            src={"/scholz-und-volkmer-website-3.jpg"}
            webp={"/scholz-und-volkmer-website-3.webp"}
            height={"926px"}
            width={"1900px"}
            alt={"image of a website"}
          />
        </div>
        <div className="case-studio__screen-image">
          <SrcImage
            src={"/scholz-und-volkmer-website-4.jpg"}
            webp={"/scholz-und-volkmer-website-4.webp"}
            height={"926px"}
            width={"1900px"}
            alt={"image of a website"}
          />
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
              src={"/scholz-und-volkmer-website-mobile.jpg"}
              webp={"/scholz-und-volkmer-website-mobile.webp"}
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
              src={"/scholz-und-volkmer-website-mobile-2.jpg"}
              webp={"/scholz-und-volkmer-website-mobile-2.webp"}
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
              src={"/scholz-und-volkmer-website-mobile-3.jpg"}
              webp={"/scholz-und-volkmer-website-mobile-3.webp"}
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
              src={"/scholz-und-volkmer-website-mobile-4.jpg"}
              webp={"/scholz-und-volkmer-website-mobile-4.webp"}
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
              src={"/scholz-und-volkmer-website-mobile-5.jpg"}
              webp={"/scholz-und-volkmer-website-mobile-5.webp"}
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
              src={"/scholz-und-volkmer-website-mobile-6.jpg"}
              webp={"/scholz-und-volkmer-website-mobile-6.webp"}
              height={"130px"}
              width={"500px"}
              alt={"image"}
            />
          </motion.li>
        </ul>
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
    </>
  );
}

export default SuvFirstSection;
