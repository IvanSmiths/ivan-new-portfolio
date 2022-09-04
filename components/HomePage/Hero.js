/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useContext, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useRouter } from "next/router";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { CursorContext } from "../CursorManager";

const Hero = () => {
  let router = useRouter();
  // eslint-disable-next-line react-hooks/exhaustive-deps

  gsap.registerPlugin(ScrollTrigger);

  const refSec = useRef(null);

  useEffect(() => {
    const element = refSec.current;
    gsap.fromTo(
      element.querySelector("#header"),
      {
        paddingBottom: 0,
        opacity: 1,
      },
      {
        paddingBottom: "25rem",
        opacity: 0.1,
        duration: 1,
        ease: "none",
        scrollTrigger: {
          trigger: element.querySelector("#header"),
          start: "350 top",
          end: "bottom top",
          markers: true,
          ease: "power1",
          scrub: true,
        },
      }
    );
  }, []);

  const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const icon = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
    },
  };

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
    <div ref={refSec} className="header__wrapper">
      <header
        id="header"
        style={{
          left: `${router.locale === "it" ? "3%" : ""}`,
        }}
        className="home-header-cnt"
      >
        <div className="big-font  title-1-cnt">
          <motion.em
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            variants={variants}
            className="title-1 "
          >
            {t("home:speed")}
          </motion.em>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 1.5, duration: 0.5 }}
            variants={variants}
          >
            {t("home:header-title")} <br />
            {t("home:header-title-2")} <br />
            {t("home:header-title-3")}
          </motion.p>
        </div>
        <div className="big-font  title-2-cnt">
          <Link href="/stuff" passHref>
            <motion.a
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 1.5, duration: 0.7 }}
              style={{
                padding: `${router.locale === "de" ? "50px 60px" : ""}`,
              }}
              variants={{
                hidden: { y: 0, rotateZ: "0deg", opacity: 0 },
                visible: { y: 0, rotateZ: "11deg", opacity: 1 },
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="tiny-font absolute-small title-link btn-small-2"
            >
              {t("common:nav-stuff")}
            </motion.a>
          </Link>
          <motion.em
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            variants={variants}
            className="title-2 impact"
          >
            {t("home:security")}
          </motion.em>
        </div>
        <div className="big-font  flex-center title-3-cnt">
          <motion.em
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.5 }}
            variants={variants}
            className="title-3"
          >
            {t("home:and")}
          </motion.em>
          <motion.svg
            height="120px"
            width="100px"
            alt="arrow down"
            className="title-arrow"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 59.126 22.371"
          >
            <motion.path
              variants={icon}
              initial="hidden"
              animate="visible"
              transition={{
                default: { delay: 1.5, duration: 3, ease: "easeInOut" },
              }}
              id="Tracciato_22"
              data-name="Tracciato 22"
              d="M-4637.739,829.608l28.168,19.976,28.168-19.976"
              transform="translate(4639.134 -828.213)"
              fill="none"
              strokeLinecap="round"
              strokeWidth="1"
            />
          </motion.svg>
        </div>
      </header>
    </div>
  );
};

export default Hero;
