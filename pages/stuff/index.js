import React, { useRef, useEffect, useContext } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";
import Head from "next/head";
import useTranslation from "next-translate/useTranslation";
import { CursorContext } from "../../components/CursorManager";

const Index = () => {
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
        scrollTrigger: {
          trigger: element.querySelector("#box"),
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
      <section ref={ref}>
        <div className="box-cnt" id="box-cnt">
          <div id="box" className="box ">
            <div id="box1" className="box1 ">
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
                        layoutId="ideology-img-1"
                        alt="image of a work"
                        decoding="async"
                        loading="lazy"
                        height="750"
                        width="600"
                        srcSet="/ideology-website-mobile-4.webp"
                        type="image/webp"
                      />
                      <motion.img
                        layoutId="ideology-img-2"
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
                    layoutId="ideology-title"
                    className="big-font box-title mobile impact"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    Ideology <br /> - {t("stuff:stuff-3")}
                  </motion.a>
                </Link>
              </div>
              <div className="box-informations-cnt">
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
                    layoutId="ideology-title"
                    className="big-font box-title impact"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    Ideology <br /> - {t("stuff:stuff-3")}
                  </motion.a>
                </Link>
                <div className="box-link-cnt flex-center">
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
                  <span>-</span>
                  <Link href="/stuff" passHref>
                    <motion.a
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ duration: 0.7 }}
                      variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 },
                      }}
                      className="box-link"
                    >
                      {t("stuff:stuff-2")}
                    </motion.a>
                  </Link>
                </div>
              </div>
            </div>
            <div id="box2" className="box2 box1">
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
                        layoutId="cg-prospect-img-1"
                        alt="image of a work"
                        decoding="async"
                        loading="lazy"
                        height="750"
                        width="600"
                        srcSet="/cgprospect.webp"
                        type="image/webp"
                      />
                      <motion.img
                        layoutId="cg-prospect-img-2"
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
                    layoutId="cg-prospect-title"
                    className="big-font box-title mobile impact"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    CG Prospect <br /> - {t("stuff:stuff-4")}
                  </motion.a>
                </Link>
              </div>
              <div className="box-informations-cnt">
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
                    layoutId="cg-prospect-title"
                    className="big-font box-title impact"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    CG Prospect <br /> - {t("stuff:stuff-4")}
                  </motion.a>
                </Link>
                <div className="box-link-cnt flex-center">
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
                  <span>-</span>
                  <Link href="/stuff" passHref>
                    <motion.a
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ duration: 0.7 }}
                      variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 },
                      }}
                      className="box-link"
                    >
                      {t("stuff:stuff-2")}
                    </motion.a>
                  </Link>
                </div>
              </div>
            </div>
            <div id="box3" className="box3 box1">
              <div className="box-image-cnt">
                <Link href="/stuff/old-portfolio">
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
                        layoutId="old-portfolio-img-1"
                        alt="image of a work"
                        decoding="async"
                        loading="lazy"
                        height="750"
                        width="600"
                        srcSet="/old-portfolio.webp"
                        type="image/webp"
                      />
                      <motion.img
                        layoutId="old-portfolio-img-2"
                        alt="image of a work"
                        loading="lazy"
                        decoding="async"
                        src="/old-portfolio.jpg"
                        height="750"
                        width="600"
                      />
                    </motion.picture>
                  </a>
                </Link>
                <Link href="/stuff/old-portfolio" passHref>
                  <motion.a
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 },
                    }}
                    layoutId="old-portfolio-title"
                    className="big-font box-title mobile impact"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    Old Portfolio <br /> - {t("stuff:stuff-4")}
                  </motion.a>
                </Link>
              </div>
              <div className="box-informations-cnt">
                <Link href="/stuff/old-portfolio" passHref>
                  <motion.a
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 },
                    }}
                    layoutId="old-portfolio-title"
                    className="big-font box-title impact"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    Old Portfolio <br /> - {t("stuff:stuff-4")}
                  </motion.a>
                </Link>
                <div className="box-link-cnt flex-center">
                  <Link href="/stuff/old-portfolio" passHref>
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
                  <span>-</span>
                  <Link href="/stuff" passHref>
                    <motion.a
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ duration: 0.7 }}
                      variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 },
                      }}
                      className="box-link"
                    >
                      {t("stuff:stuff-2")}
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
                        layoutId="old-portfolio-img-1"
                        alt="image of a work"
                        decoding="async"
                        loading="lazy"
                        height="750"
                        width="600"
                        srcSet="/old-portfolio.webp"
                        type="image/webp"
                      />
                      <motion.img
                        layoutId="old-portfolio-img-2"
                        alt="image of a work"
                        loading="lazy"
                        decoding="async"
                        src="/old-portfolio.jpg"
                        height="750"
                        width="600"
                      />
                    </motion.picture>
                  </a>
                </Link>
                <Link href="/stuff/old-portfolio" passHref>
                  <motion.a
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 },
                    }}
                    layoutId="old-portfolio-title"
                    className="big-font box-title mobile impact"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    Old Portfolio <br /> - {t("stuff:stuff-4")}
                  </motion.a>
                </Link>
              </div>
              <div className="box-informations-cnt">
                <Link href="/stuff/old-portfolio" passHref>
                  <motion.a
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 },
                    }}
                    layoutId="old-portfolio-title"
                    className="big-font box-title impact"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    Old Portfolio <br /> - {t("stuff:stuff-4")}
                  </motion.a>
                </Link>
                <div className="box-link-cnt flex-center">
                  <Link href="/stuff/old-portfolio" passHref>
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
                      {t("home:stuff")}
                    </motion.a>
                  </Link>
                  <span>-</span>
                  <Link href="/stuff" passHref>
                    <motion.a
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ duration: 0.7 }}
                      variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 },
                      }}
                      className="box-link"
                    >
                      {t("home:stuff-2")}
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
            className="caption-cnt impact impact-large large-font"
          >
            {t("stuff:home-caption")}
          </motion.h3>
          <motion.svg
            className="arrow-home"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1111.93 566.06"
          >
            <motion.g id="Livello_2" data-name="Livello 2">
              <motion.g id="Livello_1-2" data-name="Livello 1">
                <motion.path
                  variants={icon}
                  initial="hidden"
                  animate="visible"
                  transition={{
                    default: {
                      duration: 6,
                      yoyo: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                  fill="none"
                  strokeLinecap="round"
                  strokeWidth="2"
                  className="cls-1"
                  d="M1065.4,560.55l39.61,4.38,6.43-28-6.43,28c-9.72-12.33-24-29.87-42.06-50.16-61.83-69.36-113.37-127.19-187.69-163.42-52.3-25.49-101.2-31.55-199-43.68-97-12-99.36-.13-140.76-14.56-60.09-20.94-99.13-63.87-174.75-148.86C276.58,49.65,271.32,20.86,224.83,6.72c-54.61-16.6-120.5.89-165,42.07-4.56,4.22-77.48,73.62-55,148.86,19.77,66.21,106.57,114,203.86,92.22"
                />
              </motion.g>
            </motion.g>
          </motion.svg>
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
  return new Promise((resolve) => setTimeout(resolve, sec * 500));
}

export default Index;
