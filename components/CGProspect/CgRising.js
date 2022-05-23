import useTranslation from "next-translate/useTranslation";
import SrcImage from "../../components/SrcImage";
import { motion } from "framer-motion";

function CgRising() {
  let { t } = useTranslation();
  return (
    <>
      <div className="rising-action-cnt skewElem">
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          variants={{
            hidden: { opacity: 0, y: 100 },
            visible: { opacity: 1, y: 0 },
          }}
          className="indent"
        >
          {t("cg-prospect:rising")}
        </motion.p>
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
        className="falling-action-website-1-cnt skewElem"
      >
        <SrcImage
          src={"/cg-prospect-website-3.jpg"}
          webp={"/cg-prospect-website-3.webp"}
          height={"500px"}
          width={"100%"}
          alt={"image"}
          className={"falling-action-website-1"}
        />
      </motion.div>
    </>
  );
}

export default CgRising;
