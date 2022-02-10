/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef, useEffect, useContext } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { CursorContext } from '../CursorManager';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import useTranslation from 'next-translate/useTranslation';
import SrcImage from '../SrcImage';

function About() {
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
        ease: 'none',
        scrollTrigger: {
          trigger: element.querySelector('#box'),
          start: 'top top',
          end: 'bottom top',
          ease: 'power1',
          scrub: true,
          toggleClass: 'box-fixed',
        },
      }
    );
  }, []);

  const refSec = useRef(null);

  useEffect(() => {
    const element = refSec.current;
    gsap.fromTo(
      element.querySelector('#about'),
      {
        marginTop: 0,
        opacity: 1,
      },
      {
        marginTop: '30vw',
        opacity: 1,
        duration: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: element.querySelector('#about'),
          start: 'top top',
          end: 'bottom top',
          ease: 'power1',
          scrub: true,
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
    setSize('medium');
  };
  const handleMouseLeave = () => {
    setSize('small');
  };

  let { t } = useTranslation();
  return (
    <>
      <main className="homepage-about-cnt skewElem">
        <p className="description">
          Ivan Smiths, <motion.strong>{t('home:bio-2')}</motion.strong>
          {t('home:bio-3')}
          <strong>{t('home:bio-4')}</strong>
          {t('home:bio-5')}
          <strong>{t('home:bio-6')}</strong>
          {t('home:bio-7')}
        </p>
        <div className="homepage-about-sub-cnt">
          <SrcImage
            src={'/photo-of-me.jpg'}
            webp={'/photo-of-me.webp'}
            height={'908.75px'}
            width={'605.75px'}
            alt={'image'}
          />
        </div>
        <div ref={refSec} className="flex-center">
          <div id="about" className="homepage-about-p-cnt">
            <h2 className="small-font">- Ivan Smiths</h2>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              className="small-font"
            >
              {t('home:about')}
            </motion.p>
            <Link href="/about">
              <motion.a
                className="btn-small-2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                variants={{
                  hidden: { rotateZ: '0deg' },
                  visible: { rotateZ: '11deg' },
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {t('home:about-2')}
              </motion.a>
            </Link>
          </div>
        </div>
      </main>
      <AnimatePresence>
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
                          hidden: { opacity: 0, rotateZ: '11deg' },
                          visible: { opacity: 1, rotateZ: '11deg' },
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
                </div>
                <div className="box-informations-cnt">
                  <Link href="/stuff/ideology">
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
                      Ideology <br /> - {t('home:stuff-3')}
                    </motion.a>
                  </Link>
                  <div className="box-link-cnt flex-center">
                    <Link href="/stuff/ideology">
                      <motion.a
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        variants={{
                          hidden: { rotateZ: '0deg' },
                          visible: { rotateZ: '11deg' },
                        }}
                        className="btn-small box-link"
                      >
                        {t('home:stuff')}
                      </motion.a>
                    </Link>
                    <span>-</span>
                    <Link href="/stuff">
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
                        {t('home:stuff-2')}
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
                          hidden: { opacity: 0, rotateZ: '11deg' },
                          visible: { opacity: 1, rotateZ: '11deg' },
                        }}
                        className="flex-center"
                      >
                        <motion.source
                          layoutId="cgprospect-img-1"
                          alt="image of a work"
                          decoding="async"
                          loading="lazy"
                          height="750"
                          width="600"
                          srcSet="/cgprospect.webp"
                          type="image/webp"
                        />
                        <motion.img
                          layoutId="cgprospect-img-2"
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
                  <Link href="/stuff/cg-prospect">
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
                      CG Prospect <br /> - {t('home:stuff-4')}
                    </motion.a>
                  </Link>
                  <div className="box-link-cnt flex-center">
                    <Link href="/stuff/cg-prospect">
                      <motion.a
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        variants={{
                          hidden: { rotateZ: '0deg' },
                          visible: { rotateZ: '11deg' },
                        }}
                        className="btn-small box-link"
                      >
                        {t('home:stuff')}
                      </motion.a>
                    </Link>
                    <span>-</span>
                    <Link href="/stuff">
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
                        {t('home:stuff-2')}
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
                          hidden: { opacity: 0, rotateZ: '11deg' },
                          visible: { opacity: 1, rotateZ: '11deg' },
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
                </div>
                <div className="box-informations-cnt">
                  <Link href="/stuff/cg-prospect">
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
                      Old Portfolio <br /> - {t('home:stuff-4')}
                    </motion.a>
                  </Link>
                  <div className="box-link-cnt flex-center">
                    <Link href="/stuff/old-portfolio">
                      <motion.a
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        variants={{
                          hidden: { rotateZ: '0deg' },
                          visible: { rotateZ: '11deg' },
                        }}
                        className="btn-small box-link"
                      >
                        {t('home:stuff')}
                      </motion.a>
                    </Link>
                    <span>-</span>
                    <Link href="/stuff">
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
                        All the works
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
                          hidden: { opacity: 0, rotateZ: '11deg' },
                          visible: { opacity: 1, rotateZ: '11deg' },
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
                </div>
                <div className="box-informations-cnt">
                  <Link href="/stuff/old-portfolio">
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
                      Old Portfolio <br /> - {t('home:stuff-4')}
                    </motion.a>
                  </Link>
                  <div className="box-link-cnt flex-center">
                    <Link href="/stuff/old-portfolio">
                      <motion.a
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        variants={{
                          hidden: { rotateZ: '0deg' },
                          visible: { rotateZ: '11deg' },
                        }}
                        className="btn-small box-link"
                      >
                        {t('home:stuff')}
                      </motion.a>
                    </Link>
                    <span>-</span>
                    <Link href="/stuff">
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
                        All the works
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
              {t('home:home-caption')}
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
                        ease: 'easeInOut',
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
      </AnimatePresence>
    </>
  );
}

export default About;
