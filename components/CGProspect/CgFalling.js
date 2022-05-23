import useTranslation from "next-translate/useTranslation";
import SrcImage from "../../components/SrcImage";
import { motion } from "framer-motion";

const CgFalling = () => {
  let { t } = useTranslation();
  return (
    <>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        variants={{
          hidden: { opacity: 0, y: 100 },
          visible: { opacity: 1, y: 0 },
        }}
        className="falling-action-website-1-cnt falling-action-cg skewElem"
      >
        <SrcImage
          src={"/cg-prospect-website-4.jpg"}
          webp={"/cg-prospect-website-4.webp"}
          height={"500px"}
          width={"100%"}
          alt={"image"}
          className={"falling-action-website-1"}
        />
      </motion.div>
      <div className="falling-action-cnt skewElem">
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
          {t("cg-prospect:falling")}
        </motion.p>
      </div>
    </>
  );
};

export default CgFalling;
