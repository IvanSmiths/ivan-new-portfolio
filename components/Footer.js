/* eslint-disable @next/next/no-img-element */
import React, { useContext } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CursorContext } from "./CursorManager";
import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
import LanguageChange from "../utils/LanguageChange";

const ThemeToggle = dynamic(() => import("./ThemeToggle"), {
  ssr: false,
});

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
      <div className="footer__first-row">
        <div className="footer__first-col">
          <ul className="footer__icon">
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/IvanSmiths"
              >
                <img
                  src="./github-icon.svg"
                  alt="github icon"
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
                  src="./linkedin-icon.svg"
                  alt="linkedin icon"
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
          <div>
            <a href="mailto:ivansmiths.com" className="medium-font">
              info@ivansmiths.com
            </a>
            <p className="color-sec">
              Frontend developer, with a particular attention to design and
              visual experiences.
            </p>
            <span className="color-sec">© 2022 Ivan Smiths</span>
          </div>
        </div>
        <div className="footer__second-col">
          {/* <ul>
            <li>
              <Link href="/">
                <a>{t("common:nav-home")}</a>
              </Link>
            </li>
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
            </li>
          </ul> */}
          <div className="footer__utils">
            <ThemeToggle />
            <LanguageChange />
          </div>
          <div className="footer__second-col-form">
            <form className="footer__form" action="">
              <div className="footer__form-name-object">
                <div>
                  <label htmlFor="name">name</label>
                  <input type="text" id="name" />
                </div>
                <div>
                  <label htmlFor="object">object</label>
                  <input type="text" id="object" />
                </div>
              </div>
              <label className="footer__label" htmlFor="message">
                message
              </label>
              <textarea
                name="message"
                id="message"
                cols="30"
                rows="10"
              ></textarea>
              <button type="submit" className="button">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="footer__name">
        <img src="ivan-smiths.svg" alt="" />
      </div>
    </footer>
  );
};

export default Footer;
