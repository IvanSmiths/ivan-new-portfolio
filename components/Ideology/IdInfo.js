import React, { useState } from "react";
import { motion } from "framer-motion";
import useTranslation from "next-translate/useTranslation";

const IdInfo = () => {
  let { t } = useTranslation();

  const [work, setWork] = useState(`${t("ideology:work-hard")}`);

  return (
    <div className="info-cnt">
      <h2
        onMouseEnter={() => setWork(`${t("ideology:work-harder")}`)}
        onMouseLeave={() => setWork(`${t("ideology:work-hard")}`)}
        className="info-sticky spacing"
      >
        {work}
      </h2>
      <ul className="skewElem">
        <motion.li
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          variants={{
            hidden: { opacity: 0, y: 100 },
            visible: { opacity: 1, y: 0 },
          }}
          className="big-font list-info impact"
        >
          <b>{t("ideology:role")}</b>
          <motion.em
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            className="small-font list-info serif"
          >
            .{t("ideology:role-2")}
          </motion.em>
        </motion.li>
        <motion.li
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          variants={{
            hidden: { opacity: 0, y: 100 },
            visible: { opacity: 1, y: 0 },
          }}
          className="big-font list-info impact"
        >
          <b>Tech</b>
          <motion.em
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            className="small-font serif"
          >
            .Adobe XD, CSS, JavaScript, WordPress, Framer
          </motion.em>
        </motion.li>
        <motion.li
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          variants={{
            hidden: { opacity: 0, y: 100 },
            visible: { opacity: 1, y: 0 },
          }}
          className="big-font list-info impact"
        >
          <b>{t("ideology:type")}</b>
          <motion.em
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            className="small-font serif"
          >
            .{t("ideology:type-2")}
          </motion.em>
        </motion.li>
        <motion.li
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          variants={{
            hidden: { opacity: 0, y: 100 },
            visible: { opacity: 1, y: 0 },
          }}
          className="big-font list-info impact"
        >
          <b>{t("ideology:year")}</b>
          <motion.em
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            className="small-font serif"
          >
            .2020/2022
          </motion.em>
        </motion.li>
        <motion.li
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          variants={{
            hidden: { opacity: 0, y: 100 },
            visible: { opacity: 1, y: 0 },
          }}
          className="big-font list-info impact"
        >
          <b>4.735</b>
          <motion.em
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            className="small-font serif"
          >
            .{t("ideology:hours")}
          </motion.em>
        </motion.li>
        <motion.li
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          variants={{
            hidden: { opacity: 0, y: 100 },
            visible: { opacity: 1, y: 0 },
          }}
          className="big-font list-info impact"
        >
          <b>27</b>
          <motion.em
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0, y: 100 },
              visible: { opacity: 1, y: 0 },
            }}
            className="small-font serif"
          >
            .{t("ideology:parties")} <span className="emoji">????</span>
          </motion.em>
        </motion.li>
      </ul>
      <div className="info-link">
        <motion.a
          target="_blank"
          rel="noreferrer noopener"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          variants={{
            hidden: { opacity: 0, y: 100 },
            visible: { opacity: 1, y: 0 },
          }}
          className="big-font btn-big"
          href="https://www.ideology.it/"
        >
          Website
        </motion.a>
      </div>
    </div>
  );
};

export default IdInfo;
