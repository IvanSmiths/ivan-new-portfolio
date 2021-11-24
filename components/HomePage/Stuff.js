/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef, useEffect, useContext } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { CursorContext } from '../CursorManager';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

function About() {
  useEffect(() => {
    let proxy = { skew: 0 },
      skewSetter = gsap.quickSetter('.skewElem', 'skewY', 'deg'),
      clamp = gsap.utils.clamp(-0.4, 0.4);

    ScrollTrigger.create({
      onUpdate: (self) => {
        let skew = clamp(self.getVelocity() / -2);
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew;
          gsap.to(proxy, {
            skew: 0,
            duration: 0.5,
            ease: 'circ',
            overwrite: true,
            onUpdate: () => skewSetter(proxy.skew),
          });
        }
      },
    });
    gsap.set('.skewElem', { transformOrigin: 'right center', force3D: true });
  }, []);

  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  useEffect(() => {
    let proxy = { skew: 0 },
      skewSetter = gsap.quickSetter('.skewElem', 'skewY', 'deg'),
      clamp = gsap.utils.clamp(-0.5, 0.5);

    ScrollTrigger.create({
      onUpdate: (self) => {
        let skew = clamp(self.getVelocity() / -2);
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew;
          gsap.to(proxy, {
            skew: 0,
            duration: 0.8,
            ease: 'power3',
            overwrite: true,
            onUpdate: () => skewSetter(proxy.skew),
          });
        }
      },
    });
    gsap.set('.skewElem', { transformOrigin: 'right center', force3D: true });
  }, []);

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
      <main className="homepage-about-cnt skewElem">
        <p className="description">
          Ivan Smiths, <strong> react developer portfolio </strong> from
          Wiesbaden. React developer with knowledge on{' '}
          <strong> how to use React hooks </strong>
          like useState, useEffect, useContext, custom hooks and more. I
          prioritize fast website, that also are seo friendly, and at the same
          time innovating, and that looks modern. I started using React.js two
          years ago, and i rapidly switched to Next.js, for giving server side
          rendering, file based routing, and static sites generation out of the
          box. With Next.js I have built all of my projects and works, granting
          them an extreme speed and also are seo friendly. I often write guides
          and tutorials, like{' '}
          <strong> how to put 3d models on react website </strong> or just news
          about the react and next js world in general. I work in Wiesbaden as a
          frontend developer and I am also a freelancer. Contact me if you want
          to collab on a react or next.js project.
        </p>
        <div className="homepage-about-sub-cnt flex-center">
          <motion.h2 layoutId="about" className="small-font">
            IVAN SMITHS <br />
            FRONTEND DEVELOPER <br />
            UI/UX DESIGNER
          </motion.h2>
        </div>
        <div className="homepage-about-p-cnt">
          <p className="small-font">
            React developer and UI/UX designer with 2 years of professional
            experience. Passionated about 3d and ar, i like to combine this two
            worlds together.
          </p>
          <Link href="/about">
            <a onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              who am i?
            </a>
          </Link>
        </div>
      </main>
      <AnimatePresence>
        <section ref={ref}>
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
                        <motion.h2
                          layoutId="ideology-title"
                          className="big-font"
                        >
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
                    <motion.h2
                      layout="old-portfolio-title"
                      className="big-font"
                    >
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
                  <Link href="/stuff/old-portfolio">
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
                    <motion.h2
                      layout="old-portfolio-title"
                      className="big-font"
                    >
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
            <section className="caption-cnt impact impact-large large-font">
              Fell stuck? Let{`'`}s find a solution together.
            </section>
          </div>
        </section>
      </AnimatePresence>
    </>
  );
}

export default About;
