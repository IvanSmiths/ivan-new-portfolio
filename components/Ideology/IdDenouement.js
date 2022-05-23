import { motion } from "framer-motion";
import useTranslation from "next-translate/useTranslation";

function IdDenouement() {
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
        className="impact word-wrap impact-large uppercase large-font"
      >
        {t("ideology:denouement-2")}
      </motion.h3>
    </div>
  );
}

export default IdDenouement;
