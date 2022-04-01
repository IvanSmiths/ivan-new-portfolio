import { useState } from "react";
import cn from "classnames";
import { motion } from "framer-motion";
import useTranslation from "next-translate/useTranslation";

function Contact() {
  const [opened, setOpened] = useState(false);
  let { t } = useTranslation();

  return (
    <>
      <span className="contact-span" onClick={() => setOpened(!opened)}>
        {t("common:let-us-talk")}
      </span>
      <div className={cn("overlay-burger-menu menu2", { "as-opened": opened })}>
        <span
          className="close-burger2 impact"
          onClick={() => setOpened(!opened)}
        >
          X
        </span>
        <div className="contact-cnt">
          <form
            action="https://formsubmit.co/info@ivansmiths.com"
            method="POST"
            className="form"
          >
            <input type="hidden" name="_next" value="/" />
            <input type="hidden" name="_subject" value="IvanSmiths | Info" />
            <label htmlFor="name" className="tiny-font">
              {t("common:name")}
            </label>
            <input type="text" id="name" name="name" minLength="3" required />
            <label htmlFor="object" className="tiny-font">
              {t("common:object")}
            </label>
            <input
              type="text"
              id="object"
              name="object"
              minLength="4"
              required
            />
            <label htmlFor="email" className="tiny-font">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              minLength="6"
              required
            />
            <label className="tiny-font" htmlFor="message">
              {t("common:message")}
            </label>
            <textarea
              id="message"
              name="message"
              minLength="10"
              cols="30"
              rows="10"
            ></textarea>
            <button className="btn-contact small-font" type="submit">
              {t("common:send")}
            </button>
          </form>
        </div>
        <div className="contact-info-cnt">
          <em className="small-font spacing">{t("common:contact-hi")}</em>

          <p className="small-font">{t("common:contact-info")}</p>
          <motion.a
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { y: 0, rotateZ: "0deg" },
              visible: { y: 0, rotateZ: "11deg" },
            }}
            href="mailto:info@ivansmiths.com"
            className="btn-big btn-email small-font"
          >
            info@ivansmiths.com
          </motion.a>
        </div>
      </div>
    </>
  );
}

export default Contact;
