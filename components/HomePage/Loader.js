/* eslint-disable @next/next/no-img-element */
import React from "react";
import { motion } from "framer-motion";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

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
      duration: 7,
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
  hidden: { opacity: 0 },
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
  let router = useRouter();

  let { t } = useTranslation();

  return (
    <motion.div
      variants={container}
      onAnimationComplete={() => setLoading(false)}
      initial="hidden"
      animate="show"
      exit="exit"
      className="loader"
    >
      <motion.div variants={itemMain} className="loader-cnt">
        <motion.h2
          className="tiny-font spacing loader-sub-title"
          layoutId="sub-title"
          variants={titleSub}
        >
          Ivan Smiths <br /> {t("common:web-react")} (React) <br /> UI/UX
          Designer
        </motion.h2>
        <motion.h1
          className="uppercase big-font loader-title"
          layoutId="main-title"
          variants={titleMain}
        >
          <em
            style={{
              paddingLeft: `${router.locale === "it" ? "10vw" : ""}`,
            }}
            className="loader-title-1"
          >
            {t("common:web-dev")} <br />
          </em>
          <em className="loader-title-2">
            {t("common:web-dev-2")} <br />
          </em>
          <em
            style={{
              paddingLeft: `${router.locale === "it" ? "20vw" : ""}`,
            }}
            className="loader-title-3"
          >
            {t("common:web-dev-3")} <br />
          </em>
          <em className="loader-title-4">{t("common:web-dev-4")}...</em>
        </motion.h1>
      </motion.div>
    </motion.div>
  );
};

export default Loader;
