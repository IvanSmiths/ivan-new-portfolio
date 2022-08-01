import React, { useContext } from "react";
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
    <footer>
      <div className="footer-first-row"></div>
    </footer>
  );
};

export default Footer;
