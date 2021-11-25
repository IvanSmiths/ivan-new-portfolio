import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import useTranslation from 'next-translate/useTranslation';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

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

  let { t } = useTranslation();
  return (
    <header className="home-header-cnt flex-center">
      <motion.h1 layoutId="main-title" className="large-font skewElem">
        {t('home:speed')}, <br /> {t('home:security')} <br /> {t('home:and')}{' '}
        <br />{' '}
      </motion.h1>
    </header>
  );
};

export default Hero;
