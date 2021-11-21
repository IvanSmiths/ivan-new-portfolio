import React from 'react';
import { motion } from 'framer-motion';

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
  return (
    <div>
      <div className="marquee">
        <motion.div
          className="track"
          variants={marqueeVariants}
          animate="animate"
        >
          <em className="impact big-font">
            websites i{`'`}ve worked on - websites i{`'`}ve worked on - websites
            i{`'`}ve worked on - websites i{`'`}ve worked on - websites i{`'`}ve
            worked on - websites i{`'`}ve worked on - websites i{`'`}ve worked
            on
          </em>
        </motion.div>
      </div>
    </div>
  );
};

export default Marquee;
