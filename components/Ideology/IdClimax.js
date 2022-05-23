import { motion } from "framer-motion";
import SrcImage from "../../components/SrcImage";
import useTranslation from "next-translate/useTranslation";

function IdClimax() {
  let { t } = useTranslation();
  return (
    <main>
      <div className="climax-cnt flex-center skewElem">
        <div className="climax indent">
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
            {t("ideology:climax-2")}

            <br />
            <br />

            {t("ideology:climax-3")}
          </motion.p>
        </div>
      </div>
      <div className="climax-website-cnt skewElem">
        <ul className="climax-website">
          <motion.li
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0, y: 100 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex-center"
          >
            <SrcImage
              src={"/ideology-website-mobile-4.jpg"}
              webp={"/ideology-website-mobile-4.webp"}
              height={"130px"}
              width={"500px"}
              alt={"image"}
            />
          </motion.li>
          <motion.li
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0, y: 100 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex-center climax-website-margin"
          >
            <SrcImage
              src={"/ideology-website-mobile-7.jpg"}
              webp={"/ideology-website-mobile-7.webp"}
              height={"130px"}
              width={"500px"}
              alt={"image"}
            />
          </motion.li>
          <motion.li
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0, y: 100 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex-center"
          >
            <SrcImage
              src={"/ideology-website-mobile-6.jpg"}
              webp={"/ideology-website-mobile-6.webp"}
              height={"130px"}
              width={"500px"}
              alt={"image"}
            />
          </motion.li>
        </ul>
        <ul className="climax-website climax-website-2">
          <motion.li
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0, y: 100 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex-center"
          >
            <SrcImage
              src={"/ideology-website-mobile-5.jpg"}
              webp={"/ideology-website-mobile-5.webp"}
              height={"130px"}
              width={"500px"}
              alt={"image"}
            />
          </motion.li>
          <motion.li
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0, y: 100 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex-center climax-website-margin"
          >
            <SrcImage
              src={"/ideology-website-mobile-1.jpg"}
              webp={"/ideology-website-mobile-1.webp"}
              height={"130px"}
              width={"500px"}
              alt={"image"}
            />
          </motion.li>
          <motion.li
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0, y: 100 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex-center"
          >
            <SrcImage
              src={"/ideology-website-mobile-8.jpg"}
              webp={"/ideology-website-mobile-8.webp"}
              height={"130px"}
              width={"500px"}
              alt={"image"}
            />
          </motion.li>
        </ul>
      </div>
    </main>
  );
}

export default IdClimax;
