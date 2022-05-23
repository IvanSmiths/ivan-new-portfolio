import React, { useContext } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CursorContext } from "../CursorManager";
import useTranslation from "next-translate/useTranslation";

const FooterCGProspect = () => {
  let { t } = useTranslation();
  // MOUSE ZOOM HANDLER //
  const { setSize } = useContext(CursorContext);
  const handleMouseEnter = () => {
    setSize("medium");
  };
  const handleMouseLeave = () => {
    setSize("small");
  };
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
          ...{t("cg-prospect:next-up")}
        </motion.em>
        <Link passHref href="/stuff/ideology">
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
            IDEOLOGY
          </motion.a>
        </Link>
      </div>
    </div>
  );
};

export default FooterCGProspect;
