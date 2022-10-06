import React, { useContext } from "react";
import Link from "next/link";
import { CursorContext } from "../CursorManager";
import { motion } from "framer-motion";
import useTranslation from "next-translate/useTranslation";

const FooterIdeology = () => {
  const { setSize } = useContext(CursorContext);
  const handleMouseEnter = () => {
    setSize("medium");
  };
  const handleMouseLeave = () => {
    setSize("small");
  };

  let { t } = useTranslation();

  return (
    <div className="footer-home-cnt flex-center">
      <div className="footer-single-cnt">
        <motion.em
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          className="small-font spacing tiny-font"
        >
          ...{t("ideology:next-up")}
        </motion.em>
        <Link passHref href="/stuff/cg-prospect">
          <motion.a
            className="big-font impact"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            CG PROSPECT
          </motion.a>
        </Link>
      </div>
    </div>
  );
};

export default FooterIdeology;
