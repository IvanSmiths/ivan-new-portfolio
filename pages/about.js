/* eslint-disable @next/next/no-img-element */
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Head from "next/head";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

const About = () => {
  let { t } = useTranslation();

  const router = useRouter();
  gsap.registerPlugin(ScrollTrigger);
  const [complete, setComplete] = useState(false);
  const refContainer = useRef(null);
  const refTextRoad = useRef(null);
  const ref2020 = useRef(null);
  const idCopyRef = useRef(null);
  const idImageRef = useRef(null);
  const firstWebsiteCopyRef = useRef(null);
  const firstWebsiteImageRef = useRef(null);
  const cgCopyRef = useRef(null);
  const cgImageRef = useRef(null);
  const svCopyRef = useRef(null);
  const svImageRef = useRef(null);
  const ref2021 = useRef(null);
  const ref2022 = useRef(null);
  const finRef = useRef(null);
  const scrollingRef = useRef(null);
  const scrollingMoreRef = useRef(null);
  const scrollingBitRef = useRef(null);
  const scrollingGoRef = useRef(null);

  useEffect(() => {
    document.body.classList.add("about-page");
    return () => {
      document.body.classList.remove("about-page");
    };
  });

  useEffect(() => {
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: refContainer.current,
        start: "top top",
        end: "+=19200px bottom",
        scrub: true,
        onLeave: function () {
          setComplete(true);
        },
        pin: true,
      },
    });

    tl.to(refTextRoad.current, {
      ease: "none",
      scale: 2,
      opacity: 0,
    });

    tl.to(ref2020.current, {
      keyframes: [
        {
          opacity: 1,
          scale: 1.5,
        },
        {
          opacity: 0,

          scale: 2,
        },
      ],
    });

    tl.to(firstWebsiteImageRef.current, {
      opacity: 1,
    });

    tl.to(firstWebsiteCopyRef.current, {
      keyframes: [
        { opacity: 1 },
        {
          opacity: 0,
          delay: 1,
        },
      ],
    });

    tl.to(firstWebsiteImageRef.current, {
      opacity: 0,
    });
    tl.to(idImageRef.current, {
      opacity: 1,
    });

    tl.to(idCopyRef.current, {
      keyframes: [
        { opacity: 1 },
        {
          opacity: 0,
          delay: 1,
        },
      ],
    });

    tl.to(idImageRef.current, {
      opacity: 0,
    });

    tl.to(ref2021.current, {
      keyframes: [
        {
          opacity: 1,
          scale: 1.5,
        },
        {
          opacity: 0,

          scale: 2,
        },
      ],
    });
    tl.to(cgImageRef.current, {
      opacity: 1,
    });

    tl.to(cgCopyRef.current, {
      keyframes: [{ opacity: 1 }, { opacity: 0, delay: 1 }],
    });

    tl.to(cgImageRef.current, {
      opacity: 0,
    });
    tl.to(ref2022.current, {
      keyframes: [
        {
          opacity: 1,
          scale: 1.5,
        },
        {
          opacity: 0,

          scale: 2,
        },
      ],
    });
    tl.to(svCopyRef.current, {
      opacity: 1,
    });

    tl.to(svImageRef.current, {
      keyframes: [{ opacity: 1 }, { opacity: 0, delay: 1 }],
    });

    tl.to(svCopyRef.current, {
      opacity: 0,
    });

    tl.to(finRef.current, {
      keyframes: [
        {
          opacity: 1,
          scale: 1.5,
        },
        {
          opacity: 0,

          scale: 2,
        },
      ],
    });

    tl.to(scrollingRef.current, {
      keyframes: [
        {
          opacity: 1,
          scale: 1.5,
          delay: 2,
        },
        {
          opacity: 0,

          scale: 2,
        },
      ],
    });

    tl.to(scrollingMoreRef.current, {
      keyframes: [
        {
          opacity: 1,
          scale: 1.5,
        },
        {
          opacity: 0,

          scale: 2,
        },
      ],
    });

    tl.to(scrollingBitRef.current, {
      keyframes: [
        {
          opacity: 1,
          scale: 1.5,
        },
        {
          opacity: 0,

          scale: 2,
        },
      ],
    });

    tl.to(scrollingGoRef.current, {
      opacity: 1,
      scale: 1.5,
    });
  }, []);

  useEffect(() => {
    if (complete === true) {
      router.push("/stuff");
    }

    return () => {
      setComplete(complete === false);
    };
  }, [router, complete]);

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
          <h2 ref={refTextRoad}>ROADMAP</h2>
          <h3 ref={ref2020}>2020</h3>
          <img
            ref={firstWebsiteImageRef}
            className="about__absolute-right about__opacity"
            src="ivan-smiths-first-website.jpg"
            alt=""
          />
          <div
            ref={firstWebsiteCopyRef}
            className="about__roadmap__copy about__absolute-left about__opacity"
          >
            <h4 className="small-font">01 / PASSION</h4>
            <h5 className="medium-font">My journey begins</h5>
            <p>
              On 2020 my first website went online. My old portfolio was done in
              plain HTML, Css and JavaScript. Is still hosted on Netlify and it
              containes some really spooky designs.
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
          <img
            ref={idImageRef}
            className="about__absolute-right about__opacity"
            src="id-bottone.jpg"
            height="667px"
            width="375px"
            alt="image of a work"
          />
          <div
            ref={idCopyRef}
            className="about__roadmap__copy about__absolute-left about__opacity"
          >
            <h4 className="small-font">02 / DESING & FRONTEND</h4>
            <h5 className="medium-font">
              First little steps in the Tech industry
            </h5>
            <p>
              My first working experience was mainly as a UI/UX designer, but i
              had the chance of showing my frontend skills, using Css and
              jQuery.
            </p>
            <div className="about__roadmap__copy-link">
              <Link href="/stuff/ideology">
                <a className="btn-small">See more</a>
              </Link>
            </div>
          </div>
          <h3 ref={ref2021}>2021</h3>
          <div
            ref={cgCopyRef}
            className="about__roadmap__copy about__absolute-left about__opacity"
          >
            <h4 className="small-font">03 / PERSONAL WORK</h4>
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
            ref={cgImageRef}
            className="about__absolute-right about__opacity"
            src="cg-prospect-mobile.jpg"
            alt="image of a work"
          />
          <h3 ref={ref2022}>2022</h3>
          <div
            ref={svCopyRef}
            className="about__roadmap__copy about__absolute-left about__opacity"
          >
            <h4 className="small-font">04 / FRONTEND</h4>
            <h5 className="medium-font">Rocking with Vue (Nuxt.js) and Gsap</h5>
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
            ref={svImageRef}
            className="about__absolute-right about__opacity"
            src="scholz-und-volkmer-website-1.png"
            alt=" image of a work"
          />
          <span ref={finRef}>
            Fin. <br /> (for now)
          </span>
          <span ref={scrollingRef}>
            Still <br /> Scrolling?
          </span>
          <span ref={scrollingMoreRef}>
            Scroll <br /> a bit more.
          </span>
          <span ref={scrollingBitRef}>
            Just <br /> a bit more...
          </span>
          <span ref={scrollingGoRef}>
            Here <br /> you go!
          </span>
        </div>
      </main>
      <div className="spacer-small"></div>
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
