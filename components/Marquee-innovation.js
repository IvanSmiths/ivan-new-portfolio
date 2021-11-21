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
    <div className="marquee-cnt-rel">
      <div className="marquee-cnt">
        <div className=" marquee-innovation">
          <motion.div
            className="track-2"
            variants={marqueeVariants}
            animate="animate"
          >
            <em className="impact large-font">
              INNOVATION - INNOVATION - INNOVATION - INNOVATION - INNOVATION -
              INNOVATION - INNOVATION - INNOVATION - INNOVATION - INNOVATION -
              INNOVATION - INNOVATION - INNOVATION - INNOVATION - INNOVATION
            </em>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Marquee;
