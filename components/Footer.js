/* eslint-disable @next/next/no-img-element */
import React, { useContext } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CursorContext } from "./CursorManager";
import useTranslation from "next-translate/useTranslation";

const Footer = () => {
  const iconWidth = 40;

  const Replay = () => {
    localStorage.removeItem("hasVisitedBefore", true);
  };

  const { setSize } = useContext(CursorContext);
  const handleMouseEnter = () => {
    setSize("medium");
  };
  const handleMouseLeave = () => {
    setSize("small");
  };
  let { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer__first-col">
        <ul className="footer__icon">
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/IvanSmiths"
            >
              <img
                src="./instagram-icon.svg"
                alt="instagram icon"
                height="25px"
                width="25px"
              />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/ivan-fabbri/"
            >
              <img
                src="./instagram-icon.svg"
                alt="instagram icon"
                height="25px"
                width="25px"
              />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/ivan_smiths/"
            >
              <img
                src="./instagram-icon.svg"
                alt="instagram icon"
                height="25px"
                width="25px"
              />
            </a>
          </li>
        </ul>
        <a href="mailto:ivansmiths.com" className="medium-font">
          info@ivansmiths.com
        </a>
        <p>
          Frontend developer, with a particular attention to design and visual
          experiences.
        </p>
      </div>
      <div className="footer__second-col">
        <ul>
          <li>{t("common:nav-home")}</li>
          <li>
            <div className="footer__vertical-links">
              <Link href="/about">
                <a>{t("common:nav-about")}</a>
              </Link>
              <Link href="/stuff">
                <a>{t("common:nav-stuff")}</a>
              </Link>
            </div>
          </li>
          <li>
            <div className="footer__vertical-links">
              <Link href="/post">
                <a>{t("common:nav-post")}</a>
              </Link>
            </div>
          </li>
          <li>
            <div className="footer__vertical-links">
              <Link href="/post">
                <a>{t("common:nav-post")}</a>
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
