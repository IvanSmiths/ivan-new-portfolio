/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { motion } from 'framer-motion';

// Import images

const container = {
  show: {
    transition: {
      staggerChildren: 0.35,
    },
  },
};

const itemMain = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: [0.6, 0.01, -0.05, 0.95],
      duration: 3.6,
    },
  },
};

const titleMain = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: [0.6, 0.01, -0.05, 0.95],
      duration: 1.6,
    },
  },
};

const Loader = ({ setLoading }) => {
  return (
    <motion.div className="loader">
      <motion.div
        variants={container}
        onAnimationComplete={() => setLoading(false)}
        initial="hidden"
        animate="show"
        exit="exit"
        className="loader-inner"
      >
        <motion.div variants={itemMain} className="transition-image">
          <motion.h1 layoutId="main-title" variants={titleMain}>
            Web development it is just all about...
          </motion.h1>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Loader;
