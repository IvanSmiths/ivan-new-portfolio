import React, { useRef, useEffect, useContext } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";
import Head from "next/head";
import useTranslation from "next-translate/useTranslation";
import { CursorContext } from "../../components/CursorManager";
import Footer from "../../components/Footer";

const Index = () => {
  gsap.registerPlugin(ScrollTrigger);

  const refStuff = useRef(null);

  useEffect(() => {
    const element = refStuff.current;
    gsap.fromTo(
      element.querySelector("#boxStuff"),
      {
        x: 0,
        opacity: 1,
      },
      {
        x: "-200vw",
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: element.querySelector("#boxStuff"),
          start: "top top",
          end: "bottom top",
          ease: "power3",
          scrub: true,
          toggleClass: "box-fixed",
        },
      }
    );
  }, []);
  const schemaData = {
    "@context": "http://schema.org",
    "@type": "WebSite",
    name: "IvanSmiths",
    url: "https://www.ivansmiths.com",
    image: "https://www.ivansmiths.com/main-texture.jpg",
    description: `just another react developer`,
    brand: {
      "@type": "Brand",
      logo: "https://www.ivansmiths.com/logo-icon-white.svg",
    },
    sameAs: "https://www.ivansmiths.com",
    author: {
      "@type": "Person",
      name: "Ivan",
      familyName: "Smiths",
      url: "https://www.ivansmiths.com",
    },
    inLanguage: "en",
    copyrightYear: 2020,
    genre: "http://vocab.getty.edu/aat/300179434",
    headline: "speed, security & INNOVATION",
    keywords: "next.js, wiesbaden, react.js, frontend developer",
    locationCreated: "wiesbaden",
  };

  const icon = {
    hidden: {
      pathLength: 0,
    },
    visible: {
      pathLength: 1,
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
    <>
      <Head>
        <title>Ivan Smiths | All my works and projects</title>
        <meta
          name="description"
          content="All my works and projects, made all with React, Postgresql and Next,js."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>
      <section ref={refStuff}>
        <div className="box-cnt" id="box-cnt">
          <div id="boxStuff" className="box ">
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
                  01 / {t("stuff:stuff-3")}
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
                    {t("stuff:box-list")}
                    {t("stuff:box-list-dev")}
                  </li>
                  <li>
                    {t("stuff:box-list-2")}Vue.js, Nuxt.js,TypeScript, Gsap,
                    Sass
                  </li>
                  <li>2022 / {t("stuff:box-list-3")}</li>
                </motion.ul>
                <div className="box-link-cnt">
                  <Link href="/stuff/scholz-und-volkmer" passHref>
                    <motion.a
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
                      {t("stuff:stuff")}
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
                  02 / {t("stuff:stuff-3")}
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
                  <li>{t("stuff:box-list")}UI/UX Designer</li>
                  <li>
                    {t("stuff:box-list-2")}Adobe XD, CSS, jQuery, WordPress
                  </li>
                  <li>2020 / 2022</li>
                </motion.ul>
                <div className="box-link-cnt ">
                  <Link href="/stuff/ideology" passHref>
                    <motion.a
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
                      {t("stuff:stuff")}
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
                  03 / {t("stuff:stuff-4")}
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
                    {t("stuff:box-list")}
                    {t("stuff:box-list-dev-2")}, UI/UX Designer,{" "}
                    {t("stuff:box-list-mod")}
                  </li>
                  <li>
                    {t("stuff:box-list-2")}React (Next.js), MongoDB, CSS,
                    MetaShape
                  </li>
                  <li>2021 / {t("stuff:box-list-3")}</li>
                </motion.ul>
                <div className="box-link-cnt">
                  <Link href="/stuff/cg-prospect" passHref>
                    <motion.a
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
                      {t("stuff:stuff")}
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
                  03 / {t("stuff:stuff-4")}
                  <br />
                </span>
                <Link href="/stuff/cg-prospect" passHref>
                  <motion.a
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
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
                    {t("stuff:box-list")}
                    {t("stuff:box-list-dev-2")}, UI/UX Designer,{" "}
                    {t("stuff:box-list-mod")}
                  </li>
                  <li>
                    {t("stuff:box-list-2")}React (Next.js), MongoDB, CSS,
                    MetaShape
                  </li>
                  <li>2021 / {t("stuff:box-list-3")}</li>
                </motion.ul>
                <div className="box-link-cnt">
                  <Link href="/stuff/cg-prospect" passHref>
                    <motion.a
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
                      {t("stuff:stuff")}
                    </motion.a>
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
            {t("stuff:stuff-caption")}
          </motion.h3>
        </div>
      </section>
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

export default Index;
