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
      duration: 5,
    },
  },
};

const titleMain = {
  hidden: { opacity: 0, y: 200 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: [0.6, 0.01, -0.05, 0.95],
      duration: 3.2,
    },
  },
};

const titleSub = {
  hidden: { opacity: 0, y: 200 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: [0.6, 0.01, -0.05, 0.95],
      duration: 2.0,
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
          <motion.h2
            className="small-font loader-sub-title"
            layoutId="sub-title"
            variants={titleSub}
          >
            ivan smiths / frontend developer
          </motion.h2>
          <motion.h1
            className="uppercase impact medium-font"
            layoutId="main-title"
            variants={titleMain}
          >
            Web development it is just all about...
          </motion.h1>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Loader;
