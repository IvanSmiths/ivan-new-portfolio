import useTranslation from "next-translate/useTranslation";
import { motion } from "framer-motion";

function CgDenouement() {
  let { t } = useTranslation();
  return (
    <div className="denouement-cnt skewElem">
      <motion.h3
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        variants={{
          hidden: { opacity: 0, y: 100 },
          visible: { opacity: 1, y: 0 },
        }}
        className="impact impact-large uppercase word-wrap large-font"
      >
        {t("cg-prospect:denouement")}
      </motion.h3>
    </div>
  );
}

export default CgDenouement;
