/* eslint-disable @next/next/no-img-element */
import React, { useRef, useEffect, useContext } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";
import Head from "next/head";
import useTranslation from "next-translate/useTranslation";
import { CursorContext } from "../../components/CursorManager";

const Index = () => {
  gsap.registerPlugin(ScrollTrigger);

  const triggerRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const pin = gsap.fromTo(
      containerRef.current,
      {
        translateX: 0,
      },
      {
        translateX: "-200vw",
        ease: "none",
        duration: 0.5,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "6000px top",
          scrub: 0.2,
          pin: true,
        },
      }
    );
    return () => {
      pin.kill();
    };
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
      <div>
        <section ref={triggerRef} className="scroll-container-outer">
          <div id="box" ref={containerRef} className="scroll-container ">
            <div id="box1" className="scroll-section-1 scroll-section">
              <div className="box-image-cnt">
                <Link href="/stuff/scholz-und-volkmer">
                  <a
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <picture className="flex-center">
                      <source
                        alt="image of a work"
                        decoding="async"
                        height="750"
                        width="600"
                        srcSet="/scholz-und-volkmer-website-1.webp"
                        type="image/webp"
                      />
                      <img
                        alt="image of a work"
                        decoding="async"
                        src="/scholz-und-volkmer-website-1.jpg"
                        height="750"
                        width="600"
                      />
                    </picture>
                  </a>
                </Link>
              </div>
              <div className="box-informations-cnt">
                <span className="small-font box-subtitle">
                  01 / {t("stuff:stuff-3")}
                  <br />
                </span>
                <Link href="/stuff/scholz-und-volkmer" passHref>
                  <a
                    className="medium-font box-title "
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    Scholz & Volkmer
                  </a>
                </Link>
                <ul>
                  <li>
                    {t("stuff:box-list")}
                    {t("stuff:box-list-dev")}
                  </li>
                  <li>
                    {t("stuff:box-list-2")}Vue.js, Nuxt.js,TypeScript, Gsap,
                    Sass
                  </li>
                  <li>2022 / {t("stuff:box-list-3")}</li>
                </ul>
                <div className="box-link-cnt">
                  <Link href="/stuff/scholz-und-volkmer" passHref>
                    <a className="btn-small box-link">{t("stuff:stuff")}</a>
                  </Link>
                </div>
              </div>
            </div>
            <div id="box2" className="scroll-section-2 scroll-section">
              <div className="box-image-cnt">
                <Link href="/stuff/ideology">
                  <a
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <picture className="flex-center">
                      <source
                        alt="image of a work"
                        decoding="async"
                        height="750"
                        width="600"
                        srcSet="/ideology-website-mobile-4.webp"
                        type="image/webp"
                      />
                      <img
                        alt="image of a work"
                        decoding="async"
                        src="/ideology-website-mobile-4.jpg"
                        height="750"
                        width="600"
                      />
                    </picture>
                  </a>
                </Link>
              </div>
              <div className="box-informations-cnt">
                <span className="small-font box-subtitle">
                  02 / {t("stuff:stuff-3")}
                  <br />
                </span>
                <Link href="/stuff/ideology" passHref>
                  <a
                    className="medium-font box-title"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    Ideology
                  </a>
                </Link>
                <ul>
                  <li>{t("stuff:box-list")}UI/UX Designer</li>
                  <li>
                    {t("stuff:box-list-2")}Adobe XD, CSS, jQuery, WordPress
                  </li>
                  <li>2020 / 2022</li>
                </ul>
                <div className="box-link-cnt ">
                  <Link href="/stuff/ideology" passHref>
                    <a
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      className="btn-small box-link"
                    >
                      {t("stuff:stuff")}
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <div id="box3" className="scroll-section-3 scroll-section">
              <div className="box-image-cnt">
                <Link href="/stuff/cg-prospect">
                  <a
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <picture className="flex-center">
                      <source
                        alt="image of a work"
                        decoding="async"
                        height="750"
                        width="600"
                        srcSet="/cgprospect.webp"
                        type="image/webp"
                      />
                      <img
                        alt="image of a work"
                        decoding="async"
                        src="/cgprospect.jpg"
                        height="750"
                        width="600"
                      />
                    </picture>
                  </a>
                </Link>
              </div>
              <div className="box-informations-cnt">
                <span className="small-font box-subtitle">
                  03 / {t("stuff:stuff-4")}
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
                    {t("stuff:box-list")}
                    {t("stuff:box-list-dev-2")}, UI/UX Designer,{" "}
                    {t("stuff:box-list-mod")}
                  </li>
                  <li>
                    {t("stuff:box-list-2")}React (Next.js), MongoDB, CSS,
                    MetaShape
                  </li>
                  <li>2021 / {t("stuff:box-list-3")}</li>
                </ul>
                <div className="box-link-cnt">
                  <Link href="/stuff/cg-prospect" passHref>
                    <a
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      className="btn-small box-link"
                    >
                      {t("stuff:stuff")}
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="caption__wrapper">
              <h3 className="caption-cnt impact large-font">
                {t("stuff:stuff-caption")}
              </h3>
            </div>
          </div>
        </section>
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

export default Index;
