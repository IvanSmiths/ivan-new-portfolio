import React, { useState } from "react";
import { motion } from "framer-motion";
import useTranslation from "next-translate/useTranslation";

function CgInfo() {
  let { t } = useTranslation();
  const [work, setWork] = useState(`${t("cg-prospect:work-hard")}`);
  return (
    <section className="skewElem">
      <div className="info-cnt">
        <h2
          onMouseEnter={() => setWork(`${t("cg-prospect:work-harder")}`)}
          onMouseLeave={() => setWork(`${t("cg-prospect:work-hard")}`)}
          className="info-sticky spacing"
        >
          {work}
        </h2>
        <ul>
          <motion.li
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
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
              .Next JS, PostegSql, Prisma, Stripe, MailChimp
            </motion.em>
          </motion.li>
          <motion.li
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            className="big-font list-info impact"
          >
            <b>{t("cg-prospect:type")}</b>
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
              .{t("cg-prospect:type-2")}
            </motion.em>
          </motion.li>
          <motion.li
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            className="big-font list-info impact"
          >
            <b>{t("cg-prospect:year")}</b>
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
              .2021
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
              hidden: { y: 0, rotateZ: "0deg" },
              visible: { y: 0, rotateZ: "11deg" },
            }}
            className="big-font btn-big"
            href="https://www.cgprospect.com/"
          >
            Website
          </motion.a>
        </div>
      </div>
    </section>
  );
}

export default CgInfo;
