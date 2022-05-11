import { motion, AnimatePresence } from "framer-motion";
import useTranslation from "next-translate/useTranslation";

function CgHero() {
  let { t } = useTranslation();
  return (
    <header className="stuff-s-header-cnt skewElem">
      <div className="stuff-s-header-image-cnt skewElem">
        <AnimatePresence>
          <picture>
            <motion.source
              layoutId="cg-prospect-img-1"
              alt="image of a work"
              decoding="async"
              loading="lazy"
              height="600"
              width="400"
              srcSet="/cgprospect.webp"
              type="image/webp"
            />
            <motion.img
              layoutId="cg-prospect-img-2"
              alt="image of a work"
              loading="lazy"
              decoding="async"
              src="/cgprospect.jpg"
              height="600"
              width="400"
            />
          </picture>
        </AnimatePresence>
      </div>
      <div className="stuff-s-header-info-cnt skewElem">
        <div className="stuff-s-header-info-layout">
          <ul className="stuff-s-header-info">
            <motion.li
              layout="cg-prospect-prologue"
              className="tiny-font spacing"
            >
              .{t("cg-prospect:prologue")}
            </motion.li>
          </ul>
          <motion.h1 layoutId="cg-prospect-title" className="big-font impact">
            CG Prospect
          </motion.h1>
        </div>
      </div>
    </header>
  );
}

export default CgHero;
