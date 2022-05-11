/* eslint-disable @next/next/no-img-element */
import React, { useState, useContext, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { motion } from "framer-motion";
import SrcImage from "../../components/SrcImage";
import Head from "next/head";
import Marquee from "../../components/Marquee";
import { pageData } from "../../utils/sampleData";
import ProjectItem from "../../components/ProjectItem/ProjectItem";
import FooterIdeology from "../../components/Footers/FooterIdeology";
import { CursorContext } from "../../components/CursorManager";
import useTranslation from "next-translate/useTranslation";
import IdCredits from "../../components/Ideology/IdCredits";
import IdHero from "../../components/Ideology/IdHero";
import IdInfo from "../../components/Ideology/IdInfo";

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
        <title>Ivan Smiths | Ideology case studio</title>
        <meta
          name="description"
          content="I have worked in Ideology for two years, and have used WebFlow in a production environment"
        />
      </Head>

      <IdHero />
      <IdInfo />

      <div className="exposition-cnt skewElem">
        <div className="exposition">
          <motion.em
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0, y: 100 },
              visible: { opacity: 1, y: 0 },
            }}
            className="tiny-font spacing stuff-em"
          >
            . {t("ideology:exposition")}
          </motion.em>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0, y: 100 },
              visible: { opacity: 1, y: 0 },
            }}
            className="large-font impact uppercase"
          >
            {t("ideology:exposition-2")}
          </motion.h2>
        </div>
      </div>

      <motion.div className="exposition-website-1-cnt skewElem">
        <picture className={"exposition-website-1"}>
          <motion.source
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0, y: 100 },
              visible: { opacity: 1, y: 0 },
            }}
            alt="image of a work"
            decoding="async"
            loading="lazy"
            height="60%"
            width="60%"
            srcSet="/ideology-website-3.webp"
            type="image/webp"
          />
          <motion.img
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0, y: 100 },
              visible: { opacity: 1, y: 0 },
            }}
            alt="image of a work"
            loading="lazy"
            decoding="async"
            src={"/ideology-website-3.jpg"}
            height={"60%"}
            width={"60%"}
          />
        </picture>
      </motion.div>
      <div className="rising-action-cnt skewElem">
        <motion.em
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          variants={{
            hidden: { opacity: 0, y: 100 },
            visible: { opacity: 1, y: 0 },
          }}
          className="stuff-em spacing tiny-font"
        >
          .{t("ideology:rising-action")}
        </motion.em>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          variants={{
            hidden: { opacity: 0, y: 100 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          {t("ideology:rising-action-2")}
        </motion.p>
      </div>
      <div className="falling-action-website-1-cnt skewElem">
        <picture className="falling-action-website-1">
          <motion.source
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0, y: 100 },
              visible: { opacity: 1, y: 0 },
            }}
            alt="image of a work"
            decoding="async"
            loading="lazy"
            height={"500px"}
            width={"100%"}
            srcSet="/ideology-website-5.webp"
            type="image/webp"
          />
          <motion.img
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0, y: 100 },
              visible: { opacity: 1, y: 0 },
            }}
            alt="image of a work"
            loading="lazy"
            decoding="async"
            src={"/ideology-website-5.jpg"}
            height={"500px"}
            width={"100%"}
          />
        </picture>
      </div>
      <main className="climax-cnt flex-center skewElem">
        <div className="climax">
          <motion.em
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0, y: 100 },
              visible: { opacity: 1, y: 0 },
            }}
            className="stuff-em spacing tiny-font"
          >
            .climax
          </motion.em>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0, y: 100 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            {t("ideology:climax-2")}
          </motion.p>
        </div>
      </main>
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
              src={"/ideology-website-mobile-7.jpg"}
              webp={"/ideology-website-mobile-7.webp"}
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
            className="flex-center climax-website-margin"
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
            className="flex-center"
          >
            <SrcImage
              src={"/ideology-website-mobile-8.jpg"}
              webp={"/ideology-website-mobile-8.webp"}
              height={"130px"}
              width={"500px"}
              alt={"image"}
            />
          </motion.li>
        </ul>
      </div>
      <div className="falling-action-cnt skewElem">
        <motion.em
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          variants={{
            hidden: { opacity: 0, y: 100 },
            visible: { opacity: 1, y: 0 },
          }}
          className="stuff-em spacing tiny-font"
        >
          . {t("ideology:falling-action")}
        </motion.em>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          variants={{
            hidden: { opacity: 0, y: 100 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          {t("ideology:falling-action-2")}
        </motion.p>
      </div>
      <div className="falling-action-website-1-cnt skewElem">
        <picture className={"falling-action-website-1"}>
          <motion.source
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0, y: 100 },
              visible: { opacity: 1, y: 0 },
            }}
            alt="image of a work"
            decoding="async"
            loading="lazy"
            height={"500px"}
            width={"100%"}
            srcSet="/ideology-website-1.webp"
            type="image/webp"
          />
          <motion.img
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0, y: 100 },
              visible: { opacity: 1, y: 0 },
            }}
            alt="image of a work"
            loading="lazy"
            decoding="async"
            src={"/ideology-website-1.jpg"}
            height={"500px"}
            width={"100%"}
          />
        </picture>
      </div>
      <div className="denouement-cnt skewElem">
        <motion.em
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          variants={{
            hidden: { opacity: 0, y: 100 },
            visible: { opacity: 1, y: 0 },
          }}
          className="stuff-em spacing tiny-font"
        >
          .{t("ideology:denouement")}
        </motion.em>
        <motion.h3
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          variants={{
            hidden: { opacity: 0, y: 100 },
            visible: { opacity: 1, y: 0 },
          }}
          className="impact word-wrap impact-large uppercase large-font"
        >
          {t("ideology:denouement-2")}
        </motion.h3>
      </div>
      <Marquee />
      <div className="gallery-container skewElem" id="gallery-container"></div>
      <section>
        <div className="main-container" id="main-container">
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

export default Ideology;
