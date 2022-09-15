/* eslint-disable @next/next/no-img-element */
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Head from "next/head";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

const About = () => {
  let { t } = useTranslation();

  gsap.registerPlugin(ScrollTrigger);

  const refContainer = useRef(null);
  const refTextRoad = useRef(null);
  const ref2020 = useRef(null);
  const ref2021 = useRef(null);
  const ref2022 = useRef(null);
  const firstRef = useRef(null);
  const secondRef = useRef(null);
  const thirdRef = useRef(null);
  const fourthRef = useRef(null);
  const fifthRef = useRef(null);
  const sixthRef = useRef(null);
  const seventhRef = useRef(null);
  const eighthRef = useRef(null);
  const ninethRef = useRef(null);
  const tenthRef = useRef(null);

  useEffect(() => {
    const delay = 1.5;
    const delaySection = 7;
    const durationScale = 20;
    const durationGlobal = 20;

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
      duration: `${durationScale}`,
      ease: "none",
      scale: 2,
      opacity: 0,
      display: "none",
    });

    tl.to(ref2020.current, {
      keyframes: [
        {
          opacity: 1,
          scale: 1.5,
          display: "inline-block",
          delay: `${delay}`,
          duration: `${durationScale}`,
        },
        {
          opacity: 0,
          display: "none",
          duration: `${durationGlobal}`,
          scale: 2,
        },
      ],
    });

    tl.to(secondRef.current, {
      opacity: 1,
      delay: `${delay}`,
      duration: `${durationGlobal}`,
    });

    tl.to(firstRef.current, {
      keyframes: [
        { opacity: 1, duration: `${durationGlobal}` },
        {
          opacity: 0,
          display: "none",
          duration: `${durationGlobal}`,
          delay: `${delaySection}`,
        },
      ],
    });

    tl.to(secondRef.current, {
      opacity: 0,
      display: "none",
      duration: `${durationGlobal}`,
    });

    tl.to(fourthRef.current, {
      opacity: 1,
      duration: `${durationGlobal}`,
      delay: `${delay}`,
    });

    tl.to(thirdRef.current, {
      keyframes: [
        { opacity: 1, duration: `${durationGlobal}` },
        { opacity: 0, duration: `${durationGlobal}` },
      ],
    });

    tl.to(fourthRef.current, {
      opacity: 0,
      duration: `${durationGlobal}`,
    });
    tl.to(fifthRef.current, {
      opacity: 1,
      duration: `${durationGlobal}`,
      delay: `${delay}`,
    });

    tl.to(sixthRef.current, {
      keyframes: [
        { opacity: 1, duration: `${durationGlobal}` },
        { opacity: 0, duration: `${durationGlobal}` },
      ],
    });

    tl.to(fifthRef.current, {
      opacity: 0,
      duration: `${durationGlobal}`,
    });

    tl.to(ref2021.current, {
      keyframes: [
        {
          opacity: 1,
          scale: 1.5,
          delay: `${delay}`,
          display: "inline-block",
          duration: `${durationScale}`,
        },
        {
          opacity: 0,
          duration: `${durationGlobal}`,
          scale: 2,
          display: "none",
        },
      ],
    });
    tl.to(eighthRef.current, {
      opacity: 1,
      duration: `${durationGlobal}`,
      delay: `${delay}`,
    });

    tl.to(seventhRef.current, {
      keyframes: [
        { opacity: 1, duration: `${durationGlobal}` },
        { opacity: 0, duration: `${durationGlobal}` },
      ],
    });

    tl.to(eighthRef.current, {
      opacity: 0,
      duration: `${durationGlobal}`,
    });
    tl.to(ref2022.current, {
      keyframes: [
        {
          opacity: 1,
          scale: 1.5,
          display: "inline-block",
          delay: `${delay}`,
          duration: `${durationScale}`,
        },
        {
          opacity: 0,
          display: "none",
          duration: `${durationGlobal}`,
          scale: 2,
        },
      ],
    });
    tl.to(ninethRef.current, {
      opacity: 1,
      duration: `${durationGlobal}`,
      delay: `${delay}`,
    });

    tl.to(tenthRef.current, {
      keyframes: [
        { opacity: 1, duration: `${durationGlobal}` },
        { opacity: 0, duration: `${durationGlobal}` },
      ],
    });

    tl.to(ninethRef.current, {
      opacity: 0,
      duration: `${durationGlobal}`,
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
              <h3 ref={ref2020}>2020</h3>
              <img
                ref={secondRef}
                className="about__absolute-right about__opacity"
                src="ivan-smiths-first-website.jpg"
                alt=""
              />
              <div
                ref={firstRef}
                className="about__roadmap__copy about__absolute-left about__opacity"
              >
                <h4 className="small-font">01 / PASSION</h4>
                <h5 className="medium-font">My journey begins</h5>
                <p>
                  On 2020 my first website went online. My old portfolio was
                  done in plain HTML, Css and JavaScript. Is still hosted on
                  Netlify and it containes some really spooky designs.
                </p>
                <div className="about__roadmap__copy-link">
                  <a
                    href="https://ivansmiths.netlify.app/"
                    target="_blank"
                    className="btn-small"
                    rel="noreferrer noopener"
                  >
                    See more
                  </a>
                </div>
              </div>
              <div
                ref={fourthRef}
                className="about__roadmap__copy about__absolute-left about__opacity"
              >
                <h4 className="small-font">02 / DESING & FRONTEND</h4>
                <h5 className="medium-font">
                  First little steps in the Tech industry
                </h5>
                <p>
                  My first working experience was mainly as a UI/UX designer,
                  but i had the chance of showing my frontend skills, using Css
                  and jQuery.
                </p>
                <div className="about__roadmap__copy-link">
                  <Link href="/stuff/ideology">
                    <a className="btn-small">See more</a>
                  </Link>
                </div>
              </div>
              <img
                ref={thirdRef}
                className="about__absolute-right about__opacity"
                src="ideology-website-mobile-15.png"
                alt=""
              />
              <div
                ref={sixthRef}
                className="about__roadmap__copy about__absolute-left about__opacity"
              >
                <h4 className="small-font">03 / REACT</h4>
                <h5 className="medium-font">
                  Getting inside the JAMStack world
                </h5>
                <p>
                  As soon as i discovered React and Next.js, i felt in love with
                  this technologies, and i remade my website from scratch using
                  them.
                </p>
              </div>
              <img
                ref={fifthRef}
                className="about__absolute-right about__opacity"
                src="ivan-smiths-mobile.jpg"
                alt=""
              />
            </div>
            <h3 ref={ref2021}>2021</h3>
            <div
              ref={seventhRef}
              className="about__roadmap__copy about__absolute-left about__opacity"
            >
              <h4 className="small-font">04 / PERSONAL WORK</h4>
              <h5 className="medium-font">CG Prospect was born</h5>
              <p>
                With a more &quot;corporate like&quot; design, CG Prospect is a
                website focused on performances and Seo, where i freely share my
                3d models to the people.
              </p>
              <div className="about__roadmap__copy-link">
                <Link href="/stuff/cg-prospect">
                  <a className="btn-small">See more</a>
                </Link>
              </div>
            </div>
            <img
              ref={eighthRef}
              className="about__absolute-right about__opacity"
              src="cg-prospect-mobile.jpg"
              alt=""
            />
            <h3 ref={ref2022}>2022</h3>
            <div
              ref={ninethRef}
              className="about__roadmap__copy about__absolute-left about__opacity"
            >
              <h4 className="small-font">05 / FRONTEND</h4>
              <h5 className="medium-font">
                Rocking with Vue (Nuxt.js) and Gsap
              </h5>
              <p>
                As soon as i joined S&V, I started to work on various components
                and animations, using Gsap for building animation and Vuex as a
                state manager.
              </p>
              <div className="about__roadmap__copy-link">
                <Link href="/stuff/scholz-und-volkmer">
                  <a className="btn-small">See more</a>
                </Link>
              </div>
            </div>
            <img
              ref={tenthRef}
              className="about__absolute-right about__opacity"
              src="scholz-und-volkmer-website-1.png"
              alt=""
            />
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
