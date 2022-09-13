import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Head from "next/head";
import useTranslation from "next-translate/useTranslation";

const About = () => {
  let { t } = useTranslation();

  gsap.registerPlugin(ScrollTrigger);
  const refContainer = useRef(null);
  const refTextRoad = useRef(null);
  const refImage = useRef(null);
  const refDiv = useRef(null);
  const refImage2 = useRef(null);
  const refDiv2 = useRef(null);
  useEffect(() => {
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: refContainer.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        pin: true,
        markers: true,
      },
    });

    tl.to(refTextRoad.current, {
      duration: 2,
      ease: "none",
      scale: 2,
      opacity: 0,
    });

    tl.to(refDiv.current, {
      opacity: 1,
      duration: 3,
    });

    tl.to(refImage.current, {
      keyframes: [
        { opacity: 1, duration: 2 },
        { opacity: 0, duration: 2 },
      ],
    });
    tl.to(refDiv.current, {
      opacity: 0,
      duration: 3,
    });
    tl.to(refDiv2.current, {
      opacity: 1,
      duration: 3,
    });

    tl.to(refImage2.current, {
      keyframes: [
        { opacity: 1, duration: 2 },
        { opacity: 0, duration: 2 },
      ],
    });
    tl.to(refDiv2.current, {
      opacity: 0,
      duration: 3,
    });
  }, []);
  return (
    <>
      <Head>
        <title>{t("about:title")}</title>
        <meta
          name="description"
          content="Ivan Smiths, frontend web developer from Wiesbaden"
        />
      </Head>
      <header className="about__header">
        <div className="about-title-cnt">
          <h1 className="large-font impact">{t("about:title")}</h1>
        </div>
      </header>
      <main>
        <div ref={refContainer} className="about__container">
          <div className="about__roadmap">
            <div className="about__roadmap__first-text">
              <h2 ref={refTextRoad}>ROADMAP</h2>
            </div>
            <div ref={refDiv} className="about__roadmap__left-column">
              <h1>Heading</h1>
            </div>
            <div ref={refImage} className="about__roadmap__right-column">
              <img src="favicon.ico" alt="" />
            </div>
            <div ref={refDiv2} className="about__roadmap__left-column">
              <h1>Heading</h1>
            </div>
            <div ref={refImage2} className="about__roadmap__right-column">
              <img src="favicon.ico" alt="" />
            </div>
          </div>
        </div>
      </main>
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

export default About;
