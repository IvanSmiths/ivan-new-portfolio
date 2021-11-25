import React from 'react';
import { motion } from 'framer-motion';
import useTranslation from 'next-translate/useTranslation';

const marqueeVariants = {
  animate: {
    x: [0, -5735],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 36,
        ease: 'linear',
      },
    },
  },
};

const Marquee = () => {
  let { t } = useTranslation();
  return (
    <div className="marquee-cnt-rel">
      <div className="marquee-cnt">
        <div className=" marquee-innovation">
          <motion.div
            className="track-2"
            variants={marqueeVariants}
            animate="animate"
          >
            <em className="impact large-font">{t('home:innovation')}</em>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Marquee;
