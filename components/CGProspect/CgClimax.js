import useTranslation from "next-translate/useTranslation";
import { motion } from "framer-motion";
function CgClimax() {
  let { t } = useTranslation();
  return (
    <main className="climax-cnt flex-center skewElem">
      <div className="climax">
        <motion.p
          className="indent"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          variants={{
            hidden: { opacity: 0, y: 100 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          {t("cg-prospect:climax")}
        </motion.p>
      </div>
    </main>
  );
}

export default CgClimax;
