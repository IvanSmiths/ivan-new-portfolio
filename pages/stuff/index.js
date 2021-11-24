import React, { useRef, useEffect, useContext } from 'react';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Link from 'next/link';
import Head from 'next/head';
import { CursorContext } from '../../components/CursorManager';
import FooterStuff from '../../components/Footers/FooterStuff';

const Index = () => {
  gsap.registerPlugin(ScrollTrigger);

  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    gsap.fromTo(
      element.querySelector('#box'),
      {
        x: 0,
        opacity: 1,
      },
      {
        x: '-200vw',
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: element.querySelector('#box'),
          start: 'top top',
          end: 'bottom top',
          ease: 'power3',
          scrub: true,
          toggleClass: 'box-fixed',
        },
      }
    );
  }, []);
  const schemaData = {
    '@context': 'http://schema.org',
    '@type': 'WebSite',
    name: 'IvanSmiths',
    url: 'https://www.ivansmiths.com',
    image: 'https://www.ivansmiths.com/main-texture.jpg',
    description: `just another react developer`,
    brand: {
      '@type': 'Brand',
      logo: 'https://www.ivansmiths.com/logo-icon-white.svg',
    },
    sameAs: 'https://www.ivansmiths.com',
    author: {
      '@type': 'Person',
      name: 'Ivan',
      familyName: 'Smiths',
      url: 'https://www.ivansmiths.com',
    },
    inLanguage: 'en',
    copyrightYear: 2020,
    genre: 'http://vocab.getty.edu/aat/300179434',
    headline: 'speed, security & INNOVATION',
    keywords: 'next.js, wiesbaden, react.js, frontend developer',
    locationCreated: 'wiesbaden',
  };

  // MOUSE ZOOM HANDLER //
  const { setSize } = useContext(CursorContext);
  const handleMouseEnter = () => {
    setSize('medium');
  };
  const handleMouseLeave = () => {
    setSize('small');
  };
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
      <main ref={ref}>
        {' '}
        <div className="box-cnt" id="box-cnt">
          <div id="box" className="box">
            <div id="box1" className="box1">
              <div className="box-image-cnt flex-center">
                <Link href="/stuff/ideology">
                  <a
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <picture className="flex-center">
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
                    </picture>
                  </a>
                </Link>
              </div>
              <div className="box-informations-cnt">
                <div className="box-informations-title-cnt">
                  <Link href="/stuff/ideology">
                    <a
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <motion.h2 layoutId="ideology-title" className="big-font">
                        Ideology
                      </motion.h2>
                    </a>
                  </Link>
                  <span className="lines"></span>
                  <ul className="box-informations-info-cnt">
                    <li>work</li>
                    <li>webflow & frontend</li>
                    <li>2020/2022</li>
                  </ul>
                </div>
              </div>
            </div>
            <div id="box2" className="box2">
              <div className="box-image-cnt">
                <Link href="/stuff/cg-prospect">
                  <a
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <picture className="flex-center">
                      <motion.source
                        layoutId="cg-prospect-img-1"
                        alt="image of a project"
                        decoding="async"
                        loading="lazy"
                        height="750"
                        width="600"
                        srcSet="/cgprospect.webp"
                        type="image/webp"
                      />
                      <motion.img
                        layoutId="cg-prospect-img-2"
                        alt="image of a project"
                        loading="lazy"
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
                <div className="box-informations-title-cnt">
                  <Link href="/stuff/cg-prospect">
                    <a
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <motion.h2
                        layoutId="cg-prospect-title"
                        className="big-font"
                      >
                        CG Prospect
                      </motion.h2>
                    </a>
                  </Link>
                  <span className="lines"></span>
                  <ul className="box-informations-info-cnt">
                    <li>project</li>
                    <li>next.js & postgreSql</li>
                    <li>2021</li>
                  </ul>
                </div>
              </div>
            </div>
            <div id="box3" className="box3">
              <div className="box-image-cnt">
                <Link href="/">
                  <a
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <picture className="flex-center">
                      <motion.source
                        alt="image of a work"
                        decoding="async"
                        loading="lazy"
                        height="750"
                        width="600"
                        srcSet="/old-portfolio.webp"
                        type="image/webp"
                      />
                      <motion.img
                        alt="image of a work"
                        loading="lazy"
                        decoding="async"
                        src="/old-portfolio.jpg"
                        height="750"
                        width="600"
                      />
                    </picture>
                  </a>
                </Link>
              </div>
              <div className="box-informations-cnt">
                <div className="box-informations-title-cnt">
                  <motion.h2 layout="old-portfolio-title" className="big-font">
                    Old <br /> portfolio
                  </motion.h2>
                  <span className="lines"></span>
                  <ul className="box-informations-info-cnt">
                    <li>project</li>
                    <li>next.js</li>
                    <li>2020</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="box-cnt-2">
            <div id="box3" className="box3-2">
              <div className="box-image-cnt">
                <Link href="/">
                  <a
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <picture className="flex-center">
                      <motion.source
                        alt="image of a work"
                        decoding="async"
                        loading="lazy"
                        height="750"
                        width="600"
                        srcSet="/old-portfolio.webp"
                        type="image/webp"
                      />
                      <motion.img
                        alt="image of a work"
                        loading="lazy"
                        decoding="async"
                        src="/old-portfolio.jpg"
                        height="750"
                        width="600"
                      />
                    </picture>
                  </a>
                </Link>
              </div>
              <div className="box-informations-cnt">
                <div className="box-informations-title-cnt">
                  <motion.h2 layout="old-portfolio-title" className="big-font">
                    Old <br /> portfolio
                  </motion.h2>
                  <span className="lines"></span>
                  <ul className="box-informations-info-cnt">
                    <li>project</li>
                    <li>next.js</li>
                    <li>2020</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <FooterStuff />
        </div>
      </main>
    </>
  );
};

export default Index;
