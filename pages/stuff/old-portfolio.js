/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import SrcImage from "../../components/SrcImage";
import Head from "next/head";
import FooterOldPortfolio from "../../components/Footers/FooterOldPortfolio";
import { CursorContext } from "../../components/CursorManager";
import useTranslation from "next-translate/useTranslation";

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
  const [work, setWork] = useState(`${t("old-portfolio:work-hard")}`);

  return (
    <>
      <Head>
        <title>Ivan Smiths | Old portfolio case studio</title>
        <meta
          name="description"
          content="My personal old portfolio, done with Next js"
        />
      </Head>
      <header className="stuff-s-header-cnt skewElem">
        <div className="stuff-s-header-image-cnt skewElem">
          <AnimatePresence>
            <picture>
              <motion.source
                layoutId="old-portfolio-img-1"
                alt="image of a work"
                decoding="async"
                loading="lazy"
                height="600"
                width="400"
                srcSet="/old-portfolio.webp"
                type="image/webp"
              />
              <motion.img
                layoutId="old-portfolio-img-2"
                alt="image of a work"
                loading="lazy"
                decoding="async"
                src="/old-portfolio.jpg"
                height="600"
                width="400"
              />
            </picture>
          </AnimatePresence>
        </div>
        <div className="stuff-s-header-info-cnt skewElem">
          <div className="stuff-s-header-info-layout">
            <ul className="stuff-s-header-info">
              <motion.li className="tiny-font spacing">
                .{t("old-portfolio:prologue")}
              </motion.li>
            </ul>
            <motion.h1
              layoutId="old-portfolio-title"
              className="big-font impact"
            >
              Old Portfolio
            </motion.h1>
          </div>
        </div>
      </header>
      <section className="skewElem">
        <div className="info-cnt">
          <h2
            onMouseEnter={() => setWork(`${t("old-portfolio:work-harder")}`)}
            onMouseLeave={() => setWork(`${t("old-portfolio:work-hard")}`)}
            className="info-sticky spacing"
          >
            {work}
          </h2>
          <ul>
            <motion.li
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              className="big-font impact"
            >
              Tech
              <motion.em
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 },
                }}
                className="small-font serif"
              >
                .Next JS, MailChimp
              </motion.em>
            </motion.li>
            <motion.li
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              className="big-font impact"
            >
              {t("old-portfolio:type")}
              <motion.em
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 },
                }}
                className="small-font serif"
              >
                .{t("old-portfolio:type-2")}
              </motion.em>
            </motion.li>
            <motion.li
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              className="big-font impact"
            >
              {t("old-portfolio:year")}
              <motion.em
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 },
                }}
                className="small-font serif"
              >
                .2020
              </motion.em>
            </motion.li>
          </ul>
          <div className="info-link">
            <motion.a
              target="_blank"
              rel="noreferrer noopener"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              variants={{
                hidden: { y: 0, rotateZ: "0deg" },
                visible: { y: 0, rotateZ: "11deg" },
              }}
              className="big-font btn-big"
              href="https://www.cgprospect.com/"
            >
              Website
            </motion.a>
          </div>
        </div>
      </section>

      <div className="exposition-cnt skewElem">
        <div className="exposition">
          <em className="tiny-font spacing stuff-em">.exposition</em>
          <h2 className="large-font impact uppercase">
            {t("old-portfolio:fastest")}
          </h2>
        </div>
      </div>

      <div className="exposition-website-1-cnt skewElem">
        <SrcImage
          src={"/old-portfolio-screen.jpg"}
          webp={"/old-portfolio-screen.webp"}
          height={"60%"}
          width={"60%"}
          alt={"image"}
          className={"exposition-website-1"}
        />
      </div>

      <main className="climax-cnt flex-center skewElem">
        <div className="climax">
          <em className="stuff-em spacing tiny-font">.climax</em>
          <p>{t("old-portfolio:climax")}</p>
        </div>
      </main>
      <div className="falling-action-website-1-cnt falling-action-cg skewElem">
        <SrcImage
          src={"/old-portfolio-screen-2.jpg"}
          webp={"/old-portfolio-screen-2.webp"}
          height={"500px"}
          width={"100%"}
          alt={"image"}
          className={"falling-action-website-1"}
        />
      </div>

      <div className="denouement-cnt skewElem">
        <em className="stuff-em spacing tiny-font">.denouement</em>
        <h3 className="impact impact-large uppercase word-wrap large-font">
          {t("old-portfolio:denouement")}
        </h3>
      </div>

      <FooterOldPortfolio />
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
  return new Promise((resolve) => setTimeout(resolve, sec * 500));
}

export default Ideology;
