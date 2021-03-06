/* eslint-disable @next/next/no-img-element */
import { useState, useContext } from "react";
import cn from "classnames";
import { motion } from "framer-motion";
import useTranslation from "next-translate/useTranslation";
import { CursorContext } from "./CursorManager";

function Contact() {
  const [opened, setOpened] = useState(false);
  let { t } = useTranslation();

  // MOUSE ZOOM HANDLER //
  const { setSize } = useContext(CursorContext);
  const handleMouseEnter = () => {
    setSize("medium");
  };
  const handleMouseLeave = () => {
    setSize("small");
  };
  return (
    <>
      <span
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="contact-span"
        onClick={() => setOpened(!opened)}
      >
        {t("common:let-us-talk")}
      </span>
      <div className={cn("overlay-burger-menu menu2", { "as-opened": opened })}>
        <img
          onClick={() => setOpened(!opened)}
          className="close-burger2"
          src="/close-icon.png"
          height="60px"
          width="60px"
          alt="close icon"
        />
        <div className="contact-cnt">
          <form
            action="https://formsubmit.co/info@ivansmiths.com"
            method="POST"
            className="form"
          >
            <input
              type="hidden"
              name="_next"
              value="https://www.ivansmiths.com/"
            />
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
          <em className="small-font spacing contact-info-text">
            {t("common:contact-hi")}
          </em>

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
