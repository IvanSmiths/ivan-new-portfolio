/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { motion } from "framer-motion";
import { CursorContext } from "../../components/CursorManager";
import useTranslation from "next-translate/useTranslation";

const Credits = () => {
  // MOUSE ZOOM HANDLER //
  const { setSize } = useContext(CursorContext);
  const handleMouseEnter = () => {
    setSize("medium");
  };
  const handleMouseLeave = () => {
    setSize("small");
  };

  let { t } = useTranslation();
  return (
    <section className="credits-cnt flex-center skewElem">
      <motion.h3
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        variants={{
          hidden: { opacity: 0, y: 100 },
          visible: { opacity: 1, y: 0 },
        }}
        className="large-font spacing word-wrap"
      >
        {t("ideology:credits")}
      </motion.h3>
      <div className="credits-card-cnt flex-center">
        <ul className="credits-card">
          <motion.li
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            className="credits-card-title"
          >
            Ideology
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
          >
            {t("ideology:dev")}:{" "}
            <a
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              target="_blank"
              rel="noopener noreferrer"
              href="https://it.linkedin.com/in/iryna-sachko-319a54220"
            >
              Iryna Sachko
            </a>
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
          >
            {t("ideology:graphics")}:{" "}
            <a
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              target="_blank"
              rel="noopener noreferrer"
              href="https://it.linkedin.com/in/simona-pulino-536539146"
            >
              Simona Pulino
            </a>
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
          >
            {t("ideology:videomaker")}:{" "}
            <a
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/mr.peppeocchipinti/"
            >
              Mr. Peppe Occhipinti
            </a>
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
          >
            {t("ideology:illustrations")}:{" "}
            <a
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.behance.net/alessiaiacono1"
            >
              Alessia Iacono
            </a>
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
          >
            {t("ideology:photos")}:{" "}
            <a
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/irenenobile.fotografia/"
            >
              Irene Nobile
            </a>
          </motion.li>
        </ul>
        <ul className="credits-card">
          <motion.li
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            className="credits-card-title"
          >
            ReMax
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
          >
            {t("ideology:dev")}:{" "}
            <a
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              target="_blank"
              rel="noopener noreferrer"
              href="https://it.linkedin.com/in/iryna-sachko-319a54220"
            >
              Iryna Sachko
            </a>
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
          >
            {t("ideology:graphics")}:{" "}
            <a
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              target="_blank"
              rel="noopener noreferrer"
              href="https://it.linkedin.com/in/simona-pulino-536539146"
            >
              Simona Pulino
            </a>
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
          >
            {t("ideology:videomaker")}:{" "}
            <a
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/mr.peppeocchipinti/"
            >
              Mr. Peppe Occhipinti
            </a>
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
          >
            {t("ideology:illustrations")}:{" "}
            <a
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.behance.net/alessiaiacono1"
            >
              Alessia Iacono
            </a>
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
          >
            {t("ideology:photos")}:{" "}
            <a
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/irenenobile.fotografia/"
            >
              Irene Nobile
            </a>
          </motion.li>
        </ul>
        <ul className="credits-card">
          <motion.li
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            className="credits-card-title"
          >
            BeautySpace
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
          >
            {t("ideology:dev")}:{" "}
            <a
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              target="_blank"
              rel="noopener noreferrer"
              href="https://it.linkedin.com/in/iryna-sachko-319a54220"
            >
              Iryna Sachko
            </a>
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
          >
            {t("ideology:graphics")}:{" "}
            <a
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              target="_blank"
              rel="noopener noreferrer"
              href="https://it.linkedin.com/in/simona-pulino-536539146"
            >
              Simona Pulino
            </a>
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
          >
            {t("ideology:videomaker")}:{" "}
            <a
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/mr.peppeocchipinti/"
            >
              Mr. Peppe Occhipinti
            </a>
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
          >
            {t("ideology:illustrations")}:{" "}
            <a
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.behance.net/alessiaiacono1"
            >
              Alessia Iacono
            </a>
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
          >
            {t("ideology:photos")}:{" "}
            <a
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/irenenobile.fotografia/"
            >
              Irene Nobile
            </a>
          </motion.li>
        </ul>
        <ul className="credits-card">
          <motion.li
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            className="credits-card-title"
          >
            mabù
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
          >
            {t("ideology:dev")}:{" "}
            <a
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              target="_blank"
              rel="noopener noreferrer"
              href="https://it.linkedin.com/in/iryna-sachko-319a54220"
            >
              Iryna Sachko
            </a>
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
          >
            {t("ideology:graphics")}:{" "}
            <a
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              target="_blank"
              rel="noopener noreferrer"
              href="https://it.linkedin.com/in/simona-pulino-536539146"
            >
              Simona Pulino
            </a>
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
          >
            {t("ideology:videomaker")}:{" "}
            <a
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/mr.peppeocchipinti/"
            >
              Mr. Peppe Occhipinti
            </a>
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
          >
            {t("ideology:illustrations")}:{" "}
            <a
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.behance.net/alessiaiacono1"
            >
              Alessia Iacono
            </a>
            , {""}
            <a
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/ncherry_nf/"
            >
              NCherry
            </a>
          </motion.li>
        </ul>
        <ul className="credits-card">
          <motion.li
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            className="credits-card-title"
          >
            bionatur
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
          >
            {t("ideology:dev")}:{" "}
            <a
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              target="_blank"
              rel="noopener noreferrer"
              href="https://it.linkedin.com/in/iryna-sachko-319a54220"
            >
              Iryna Sachko
            </a>
            , {""}
            <a
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              target="_blank"
              rel="noopener noreferrer"
              href="https://it.linkedin.com/in/danielvello"
            >
              Daniel Vello
            </a>
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
          >
            {t("ideology:graphics")}:{" "}
            <a
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              target="_blank"
              rel="noopener noreferrer"
              href="https://it.linkedin.com/in/simona-pulino-536539146"
            >
              Simona Pulino
            </a>
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
          >
            {t("ideology:illustrations")}:{" "}
            <a
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.behance.net/alessiaiacono1"
            >
              Alessia Iacono
            </a>
          </motion.li>
        </ul>
        <ul className="credits-card">
          <motion.li
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            className="credits-card-title"
          >
            N.D. Frutta
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
          >
            UI/UX:{" "}
            <a
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/virginia-boncoraglio-6386091aa"
            >
              Virginia Boncoraglio
            </a>
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
          >
            {t("ideology:graphics")}:{" "}
            <a
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              target="_blank"
              rel="noopener noreferrer"
              href="https://it.linkedin.com/in/simona-pulino-536539146"
            >
              Simona Pulino
            </a>
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
          >
            {t("ideology:videomaker")}:{" "}
            <a
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/mr.peppeocchipinti/"
            >
              Mr. Peppe Occhipinti
            </a>
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
          >
            {t("ideology:illustrations")}:{" "}
            <a
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.behance.net/alessiaiacono1"
            >
              Alessia Iacono
            </a>
            , {""}
            <a
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/ncherry_nf/"
            >
              NCherry
            </a>
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
          >
            {t("ideology:photos")}:{" "}
            <a
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/irenenobile.fotografia/"
            >
              Irene Nobile
            </a>
          </motion.li>
        </ul>
        <ul className="credits-card">
          <motion.li
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            className="credits-card-title"
          >
            Area System
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
          >
            UI/UX:{" "}
            <a
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/virginia-boncoraglio-6386091aa"
            >
              Virginia Boncoraglio
            </a>
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
          >
            {t("ideology:graphics")}:{" "}
            <a
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              target="_blank"
              rel="noopener noreferrer"
              href="https://it.linkedin.com/in/simona-pulino-536539146"
            >
              Simona Pulino
            </a>
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
          >
            {t("ideology:videomaker")}:{" "}
            <a
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/mr.peppeocchipinti/"
            >
              Mr. Peppe Occhipinti
            </a>
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
          >
            {t("ideology:illustrations")}:{" "}
            <a
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.behance.net/alessiaiacono1"
            >
              Alessia Iacono
            </a>
            , {""}
            <a
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/ncherry_nf/"
            >
              NCherry
            </a>
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
          >
            {t("ideology:photos")}:{" "}
            <a
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/irenenobile.fotografia/"
            >
              Irene Nobile
            </a>
          </motion.li>
        </ul>
        <ul className="credits-card">
          <motion.li
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            className="credits-card-title"
          >
            O.P.S.
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
          >
            UI/UX:{" "}
            <a
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/virginia-boncoraglio-6386091aa"
            >
              Virginia Boncoraglio
            </a>
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
          >
            {t("ideology:graphics")}:{" "}
            <a
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              target="_blank"
              rel="noopener noreferrer"
              href="https://it.linkedin.com/in/simona-pulino-536539146"
            >
              Simona Pulino
            </a>
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
          >
            {t("ideology:videomaker")}:{" "}
            <a
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/mr.peppeocchipinti/"
            >
              Mr. Peppe Occhipinti
            </a>
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
          >
            {t("ideology:illustrations")}:{" "}
            <a
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.behance.net/alessiaiacono1"
            >
              Alessia Iacono
            </a>
            , {""}
            <a
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/ncherry_nf/"
            >
              NCherry
            </a>
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
          >
            {t("ideology:photos")}:{" "}
            <a
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/irenenobile.fotografia/"
            >
              Irene Nobile
            </a>
          </motion.li>
        </ul>
        <ul className="credits-card">
          <motion.li
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            className="credits-card-title"
          >
            Mizzica
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
          >
            UI/UX:{" "}
            <a
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/virginia-boncoraglio-6386091aa"
            >
              Virginia Boncoraglio
            </a>
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
          >
            {t("ideology:graphics")}:{" "}
            <a
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              target="_blank"
              rel="noopener noreferrer"
              href="https://it.linkedin.com/in/simona-pulino-536539146"
            >
              Simona Pulino
            </a>
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
          >
            {t("ideology:videomaker")}:{" "}
            <a
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/mr.peppeocchipinti/"
            >
              Mr. Peppe Occhipinti
            </a>
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
          >
            {t("ideology:illustrations")}:{" "}
            <a
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.behance.net/alessiaiacono1"
            >
              Alessia Iacono
            </a>
            , {""}
            <a
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/ncherry_nf/"
            >
              NCherry
            </a>
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
          >
            {t("ideology:photos")}:{" "}
            <a
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/irenenobile.fotografia/"
            >
              Irene Nobile
            </a>
          </motion.li>
        </ul>
      </div>
    </section>
  );
};

export default Credits;
