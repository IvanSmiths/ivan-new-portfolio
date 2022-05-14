import useTranslation from "next-translate/useTranslation";
import { motion, LayoutGroup } from "framer-motion";

const IdHero = () => {
  let { t } = useTranslation();
  return (
    <header className="stuff-s-header-cnt skewElem">
      <div className="stuff-s-header-image-cnt ">
        <LayoutGroup>
          <picture>
            <motion.source
              layoutId="ideology-img-1"
              alt="image of a work"
              decoding="async"
              loading="lazy"
              height="600"
              width="400"
              srcSet="/ideology-website-mobile-4.webp"
              type="image/webp"
            />
            <motion.img
              layoutId="ideology-img-2"
              alt="image of a work"
              loading="lazy"
              decoding="async"
              src="/ideology-website-mobile-4.jpg"
              height="600"
              width="400"
            />
          </picture>
        </LayoutGroup>
      </div>
      <div className="stuff-s-header-info-cnt ">
        <div className="stuff-s-header-info-layout">
          <ul className="stuff-s-header-info">
            <motion.li layout="ideology-prologue" className="tiny-font spacing">
              .{t("ideology:prologue")}
            </motion.li>
          </ul>
          <motion.h1 layoutId="ideology-title" className="impact big-font">
            Ideology
          </motion.h1>
        </div>
      </div>
    </header>
  );
};

export default IdHero;
