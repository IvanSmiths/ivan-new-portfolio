import useTranslation from "next-translate/useTranslation";
import SrcImage from "../../components/SrcImage";
import { motion } from "framer-motion";

function CgExp() {
  let { t } = useTranslation();
  return (
    <>
      <div className="exposition-cnt skewElem">
        <div className="exposition">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0, y: 100 },
              visible: { opacity: 1, y: 0 },
            }}
            className="large-font word-wrap impact uppercase"
          >
            {t("cg-prospect:fastest")}
          </motion.h2>
        </div>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        variants={{
          hidden: { opacity: 0, y: 100 },
          visible: { opacity: 1, y: 0 },
        }}
        className="exposition-website-1-cnt skewElem"
      >
        <SrcImage
          src={"/cg-prospect-website-2.jpg"}
          webp={"/cg-prospect-website-2.webp"}
          height={"60%"}
          width={"60%"}
          alt={"image"}
          className={"exposition-website-1"}
        />
      </motion.div>
    </>
  );
}

export default CgExp;
