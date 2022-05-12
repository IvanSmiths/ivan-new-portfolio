import { motion } from "framer-motion";
import useTranslation from "next-translate/useTranslation";

function IdFalling() {
  let { t } = useTranslation();

  return (
    <>
      <div className="falling-action-cnt skewElem">
        <motion.em
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          variants={{
            hidden: { opacity: 0, y: 100 },
            visible: { opacity: 1, y: 0 },
          }}
          className="stuff-em spacing tiny-font"
        >
          . {t("ideology:falling-action")}
        </motion.em>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          variants={{
            hidden: { opacity: 0, y: 100 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          {t("ideology:falling-action-2")}
        </motion.p>
        <br /> <br />
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          variants={{
            hidden: { opacity: 0, y: 100 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          {t("ideology:falling-action-3")}
        </motion.p>
      </div>
      <div className="falling-action-website-1-cnt skewElem">
        <picture className={"falling-action-website-1"}>
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
            srcSet="/ideology-team.webp"
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
            src={"/ideology-team.jpg"}
            height={"500px"}
            width={"100%"}
          />
        </picture>
      </div>
    </>
  );
}

export default IdFalling;
