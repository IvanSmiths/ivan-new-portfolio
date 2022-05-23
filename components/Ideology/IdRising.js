import { motion } from "framer-motion";
import useTranslation from "next-translate/useTranslation";

const IdRising = () => {
  let { t } = useTranslation();

  return (
    <>
      <div className="rising-action-cnt skewElem">
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
          {t("ideology:rising-action-2")}

          <br />
          <br />
          {t("ideology:rising-action-3")}
        </motion.p>
      </div>
      <div className="falling-action-website-1-cnt skewElem">
        <picture className="falling-action-website-1">
          <motion.source
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0, y: 100 },
              visible: { opacity: 1, y: 0 },
            }}
            alt="image of a work"
            decoding="async"
            loading="lazy"
            height={"500px"}
            width={"100%"}
            srcSet="/ideology-adobe-xd.webp"
            type="image/webp"
          />
          <motion.img
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0, y: 100 },
              visible: { opacity: 1, y: 0 },
            }}
            alt="image of a work"
            loading="lazy"
            decoding="async"
            src={"/ideology-adobe-xd.jpg"}
            height={"500px"}
            width={"100%"}
          />
        </picture>
      </div>
    </>
  );
};

export default IdRising;
