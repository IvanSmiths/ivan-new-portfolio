import React, { useState, useContext, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import useTranslation from "next-translate/useTranslation";

function IdExp() {
  let { t } = useTranslation();
  return (
    <>
      <div className="exposition-cnt skewElem">
        <div className="exposition">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0, y: 100 },
              visible: { opacity: 1, y: 0 },
            }}
            className="large-font impact uppercase"
          >
            {t("ideology:exposition-2")}
          </motion.h2>
        </div>
      </div>
      <div className="full-width skewElem">
        <picture className="exposition-website-1">
          <motion.source
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0, y: 100 },
              visible: { opacity: 1, y: 0 },
            }}
            alt="image of a work"
            decoding="async"
            loading="lazy"
            height="60%"
            width="60%"
            srcSet="/ideology-website-6.webp"
            type="image/webp"
          />
          <motion.img
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0, y: 100 },
              visible: { opacity: 1, y: 0 },
            }}
            alt="image of a work"
            loading="lazy"
            decoding="async"
            src="/ideology-ideology-website-6.png"
            height="60%"
            width="60%"
          />
        </picture>
      </div>
    </>
  );
}

export default IdExp;
