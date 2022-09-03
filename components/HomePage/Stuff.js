/* eslint-disable @next/next/no-img-element */
import React, { useRef, useEffect, useContext } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { CursorContext } from "../CursorManager";
import { motion, LayoutGroup } from "framer-motion";
import { useRouter } from "next/router";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import useTranslation from "next-translate/useTranslation";
import SrcImage from "../SrcImage";

function About() {
  let router = useRouter();

  gsap.registerPlugin(ScrollTrigger);

  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    gsap.fromTo(
      element.querySelector("#box"),
      {
        x: 0,
        opacity: 1,
      },
      {
        x: "-200vw",
        opacity: 1,
        duration: 1,
        ease: "none",
        scrollTrigger: {
          trigger: element.querySelector("#box"),
          start: "top top",
          end: "bottom top",
          ease: "power1",
          scrub: true,
          toggleClass: "box-fixed",
        },
      }
    );
  }, []);

  const refAbout = useRef(null);

  useEffect(() => {
    const element = refAbout.current;
    gsap.fromTo(
      element.querySelector("#about-image-cnt"),
      {
        scale: 1,
      },
      {
        scale: 0.75,
        duration: 1,
        ease: "none",
        scrollTrigger: {
          trigger: element.querySelector("#about-image-cnt"),
          start: "top bottom",
          end: "bottom top",
          ease: "power3",
          scrub: true,
        },
      }
    );
  }, []);

  // const refSec = useRef(null);

  // useEffect(() => {
  //   const element = refSec.current;
  //   gsap.fromTo(
  //     element.querySelector("#about"),
  //     {
  //       marginTop: 0,
  //       opacity: 1,
  //     },
  //     {
  //       marginBottom: "20rem",
  //       opacity: 1,
  //       duration: 1,
  //       ease: "none",
  //       scrollTrigger: {
  //         trigger: element.querySelector("#about"),
  //         start: "top top",
  //         end: "bottom top",
  //         ease: "power1",
  //         scrub: true,
  //       },
  //     }
  //   );
  // }, []);

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
            duration: 0.8,
            ease: "power3",
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

  return (
    <>
      <main ref={refAbout} className="homepage-about-cnt skewElem">
        <p className="description">
          Ivan Smiths, <motion.strong>{t("home:bio-2")}</motion.strong>
          {t("home:bio-3")}
          <strong>{t("home:bio-4")}</strong>
          {t("home:bio-5")}
          <strong>{t("home:bio-6")}</strong>
          {t("home:bio-7")}
        </p>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          id="about-image-cnt"
          className="homepage-about-img-cnt"
        >
          <SrcImage
            src={"/photo-of-me.jpg"}
            webp={"/photo-of-me.webp"}
            height={"908.75px"}
            width={"605.75px"}
            alt={"image"}
          />
        </motion.div>
        <div id="about" className="homepage-about-p-cnt">
          <div className="about">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              className="about-cnt"
            >
              <h2 className="tiny-font spacing">ivan smiths</h2>
              <h3 className="medium-font">{t("home:about-desc")}</h3>
            </motion.div>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              className="small-font indent"
            >
              {t("home:about")}
              <br />
              <br />
              {t("home:about-p2")}
            </motion.p>
          </div>
        </div>
        <Link href="/about" passHref>
          <motion.a
            className="btn-small btn-4 medium-font homepage-about-link  btn-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { rotateZ: "0deg" },
              visible: { rotateZ: "11deg" },
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {t("home:about-2")}
          </motion.a>
        </Link>
      </main>
      <section ref={ref}>
        <div className="box-cnt" id="box-cnt">
          <div id="box" className="box ">
            <div id="box1" className="box1 ">
              <div className="box-image-cnt">
                <Link href="/stuff/scholz-und-volkmer">
                  <a
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <motion.picture
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ duration: 0.7 }}
                      variants={{
                        hidden: { opacity: 0, rotateZ: "11deg" },
                        visible: { opacity: 1, rotateZ: "11deg" },
                      }}
                      className="flex-center"
                    >
                      <motion.source
                        alt="image of a work"
                        decoding="async"
                        loading="lazy"
                        height="750"
                        width="600"
                        srcSet="/scholz-und-volkmer-website-1.webp"
                        type="image/webp"
                      />
                      <motion.img
                        alt="image of a work"
                        loading="lazy"
                        decoding="async"
                        src="/scholz-und-volkmer-website-1.jpg"
                        height="750"
                        width="600"
                      />
                    </motion.picture>
                  </a>
                </Link>
              </div>
              <div className="box-informations-cnt">
                <span className="small-font box-subtitle">
                  01 / {t("home:stuff-3")}
                  <br />
                </span>
                <Link href="/stuff/scholz-und-volkmer" passHref>
                  <motion.a
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 },
                    }}
                    className="medium-font box-title "
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    Scholz & Volkmer
                  </motion.a>
                </Link>
                <motion.ul
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 },
                  }}
                >
                  <li>
                    {t("home:box-list")}
                    {t("home:box-list-dev")}
                  </li>
                  <li>
                    {t("home:box-list-2")}Vue.js, Nuxt.js,TypeScript, Gsap, Sass
                  </li>
                  <li>2022 / {t("home:box-list-3")}</li>
                </motion.ul>
                <div className="box-link-cnt">
                  <Link href="/stuff/scholz-und-volkmer" passHref>
                    <motion.a
                      initial="hidden"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ duration: 0.7 }}
                      variants={{
                        hidden: { rotateZ: "0deg" },
                        visible: { rotateZ: "11deg" },
                      }}
                      className="btn-small box-link"
                    >
                      {t("home:stuff")}
                    </motion.a>
                  </Link>
                </div>
              </div>
            </div>
            <div id="box2" className="box2 box1">
              <div className="box-image-cnt">
                <Link href="/stuff/ideology">
                  <a
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <motion.picture
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ duration: 0.7 }}
                      variants={{
                        hidden: { opacity: 0, rotateZ: "11deg" },
                        visible: { opacity: 1, rotateZ: "11deg" },
                      }}
                      className="flex-center"
                    >
                      <motion.source
                        alt="image of a work"
                        decoding="async"
                        loading="lazy"
                        height="750"
                        width="600"
                        srcSet="/ideology-website-mobile-4.webp"
                        type="image/webp"
                      />
                      <motion.img
                        alt="image of a work"
                        loading="lazy"
                        decoding="async"
                        src="/ideology-website-mobile-4.jpg"
                        height="750"
                        width="600"
                      />
                    </motion.picture>
                  </a>
                </Link>
              </div>
              <div className="box-informations-cnt">
                <span className="small-font box-subtitle">
                  02 / {t("home:stuff-3")}
                  <br />
                </span>
                <Link href="/stuff/ideology" passHref>
                  <motion.a
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 },
                    }}
                    className="medium-font box-title"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    Ideology
                  </motion.a>
                </Link>
                <motion.ul
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 },
                  }}
                >
                  <li>{t("home:box-list")}UI/UX Designer</li>
                  <li>
                    {t("home:box-list-2")}Adobe XD, CSS, jQuery, WordPress
                  </li>
                  <li>2020 / 2022</li>
                </motion.ul>
                <div className="box-link-cnt ">
                  <Link href="/stuff/ideology" passHref>
                    <motion.a
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ duration: 0.7 }}
                      variants={{
                        hidden: { rotateZ: "0deg" },
                        visible: { rotateZ: "11deg" },
                      }}
                      className="btn-small box-link"
                    >
                      {t("home:stuff")}
                    </motion.a>
                  </Link>
                </div>
              </div>
            </div>
            <div id="box3" className="box3 box1">
              <div className="box-image-cnt">
                <Link href="/stuff/cg-prospect">
                  <a
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <motion.picture
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ duration: 0.7 }}
                      variants={{
                        hidden: { opacity: 0, rotateZ: "11deg" },
                        visible: { opacity: 1, rotateZ: "11deg" },
                      }}
                      className="flex-center"
                    >
                      <motion.source
                        alt="image of a work"
                        decoding="async"
                        loading="lazy"
                        height="750"
                        width="600"
                        srcSet="/cgprospect.webp"
                        type="image/webp"
                      />
                      <motion.img
                        alt="image of a work"
                        loading="lazy"
                        decoding="async"
                        src="/cgprospect.jpg"
                        height="750"
                        width="600"
                      />
                    </motion.picture>
                  </a>
                </Link>
              </div>
              <div className="box-informations-cnt">
                <span className="small-font box-subtitle">
                  03 / {t("home:stuff-4")}
                  <br />
                </span>
                <Link href="/stuff/cg-prospect" passHref>
                  <motion.a
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 },
                    }}
                    className="medium-font box-title"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    CG Prospect
                  </motion.a>
                </Link>
                <motion.ul
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 },
                  }}
                >
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
                </motion.ul>
                <div className="box-link-cnt">
                  <Link href="/stuff/cg-prospect" passHref>
                    <motion.a
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ duration: 0.7 }}
                      variants={{
                        hidden: { rotateZ: "0deg" },
                        visible: { rotateZ: "11deg" },
                      }}
                      className="btn-small box-link"
                    >
                      {t("home:stuff")}
                    </motion.a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="box-cnt-2">
            <div id="box2" className="box3-2 box1 ">
              <div className="box-image-cnt">
                <Link href="/stuff/cg-prospects">
                  <a
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <motion.picture
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ duration: 0.7 }}
                      variants={{
                        hidden: { rotateZ: "11deg" },
                        visible: { rotateZ: "11deg" },
                      }}
                      className="flex-center"
                    >
                      <motion.source
                        alt="image of a work"
                        decoding="async"
                        loading="lazy"
                        height="750"
                        width="600"
                        srcSet="/cgprospect.webp"
                        type="image/webp"
                      />
                      <motion.img
                        alt="image of a work"
                        loading="lazy"
                        decoding="async"
                        src="/cgprospect.jpg"
                        height="750"
                        width="600"
                      />
                    </motion.picture>
                  </a>
                </Link>
              </div>
              <div className="box-informations-cnt">
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
                    <a className="btn-small box-link">{t("home:stuff")}</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <motion.h3
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0, y: 100 },
              visible: { opacity: 1, y: 0 },
            }}
            className="caption-cnt impact large-font"
          >
            {t("home:home-caption")}
          </motion.h3>
        </div>
      </section>
    </>
  );
}

export default About;
