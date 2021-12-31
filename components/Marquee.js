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
        duration: 96,
        ease: 'linear',
      },
    },
  },
};

const Marquee = () => {
  let { t } = useTranslation();
  return (
    <div>
      <div className="marquee">
        <motion.div
          className="track"
          variants={marqueeVariants}
          animate="animate"
        >
          <em className="impact big-font">{t('ideology:marquee')}</em>
        </motion.div>
      </div>
    </div>
  );
};

export default Marquee;
