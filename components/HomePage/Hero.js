/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { CursorContext } from '../CursorManager';

const Hero = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps

  // SKEW
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

  gsap.registerPlugin(ScrollTrigger);
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
    <header className="home-header-cnt flex-center">
      <div className="big-font flex-center skewElem title-1-cnt">
        <em className="title-1">{t('home:speed')}</em>
        <img
          className="title-image"
          src="/ideology-website-5.jpg"
          height="170px"
          width="180px"
          alt="works"
        />
      </div>
      <div className="big-font skewElem flex-center title-2-cnt">
        <Link href="/stuff">
          <motion.a
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { y: 0, rotateZ: '0deg' },
              visible: { y: 0, rotateZ: '11deg' },
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="small-font title-link btn-small-2"
          >
            {t('common:nav-stuff')}
          </motion.a>
        </Link>
        <em className="title-2">{t('home:security')}</em>
      </div>
      <div className="big-font skewElem flex-center title-3-cnt">
        <em className="title-3"> {t('home:and')} </em>
        <motion.svg
          height="60px"
          width="50px"
          alt="arrow down"
          className="title-arrow"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 59.126 22.371"
        >
          <motion.path
            variants={icon}
            initial="hidden"
            animate="visible"
            transition={{
              default: { duration: 6, ease: 'easeInOut' },
            }}
            id="Tracciato_22"
            data-name="Tracciato 22"
            d="M-4637.739,829.608l28.168,19.976,28.168-19.976"
            transform="translate(4639.134 -828.213)"
            fill="none"
            strokeLinecap="round"
            strokeWidth="2"
          />
        </motion.svg>
      </div>
    </header>
  );
};

export default Hero;
