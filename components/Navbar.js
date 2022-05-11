/* eslint-disable @next/next/no-img-element */
import { useState, useContext } from "react";
import cn from "classnames";
import { useRouter } from "next/router";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import { motion, useAnimation } from "framer-motion";
import { CursorContext } from "./CursorManager";

const path01Variants = {
  open: { d: "M3.06061 2.99999L21.0606 21" },
  closed: { d: "M0 9.5L24 9.5" },
};

const path02Variants = {
  open: { d: "M3.00006 21.0607L21 3.06064" },
  moving: { d: "M0 14.5L24 14.5" },
  closed: { d: "M0 14.5L15 14.5" },
};

function Navbar() {
  // MOUSE ZOOM HANDLER //
  const { setSize } = useContext(CursorContext);
  const handleMouseEnter = () => {
    setSize("medium");
  };
  const handleMouseLeave = () => {
    setSize("small");
  };
  let router = useRouter();
  const [isOpen, setOpen] = useState(false);
  const [opened, setOpened] = useState(false);
  const path01Controls = useAnimation();
  const path02Controls = useAnimation();

  const onClick = async () => {
    setOpen(!isOpen);
    setOpened(!opened);
    if (!isOpen) {
      await path02Controls.start(path02Variants.moving);
      path01Controls.start(path01Variants.open);
      path02Controls.start(path02Variants.open);
    } else {
      path01Controls.start(path01Variants.closed);
      await path02Controls.start(path02Variants.moving);
      path02Controls.start(path02Variants.closed);
    }
  };

  let { t } = useTranslation();
  return (
    <>
      <svg
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="button-nav"
        onClick={onClick}
        width="44"
        height="44"
        viewBox="0 0 24 24"
      >
        <motion.path
          {...path01Variants.closed}
          animate={path01Controls}
          transition={{ duration: 0.4 }}
        />
        <motion.path
          {...path02Variants.closed}
          animate={path02Controls}
          transition={{ duration: 0.4 }}
        />
      </svg>
      <nav className={cn("overlay-burger-menu", { "as-opened": opened })}>
        <span className="close-nav"></span>
        <div className="links-socials-cnt">
          <ul className="burger-menu-links-cnt">
            <li>
              <Link href="/">
                <a onClick={onClick} className="impact medium-font">
                  {t("common:nav-home")}
                </a>
              </Link>
            </li>

            <li>
              <Link href="/stuff">
                <a onClick={onClick} className="impact medium-font">
                  {t("common:nav-stuff")}
                </a>
              </Link>
            </li>

            <li>
              <Link href="/about">
                <a onClick={onClick} className="impact medium-font">
                  {t("common:nav-about")}
                </a>
              </Link>
            </li>

            <li>
              <Link href="/post">
                <a onClick={onClick} className="impact medium-font">
                  {t("common:nav-post")}
                </a>
              </Link>
            </li>
          </ul>
          <ul className="nav-social-cnt">
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/ivan_smiths"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.artstation.com/ivansmiths"
              >
                Artstation
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/IvanSmiths"
              >
                Github
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://it.linkedin.com/in/ivan-fabbri-932aaa205?trk=people-guest_people_search-card"
              >
                Linkedin
              </a>
            </li>
          </ul>
          <ul className="lang-cnt2">
            <li>
              <Link locale="en" href={router.asPath}>
                <a className="tiny-font">{router.locales[0]}</a>
              </Link>
            </li>
            <li className="tiny-font">/</li>
            <li>
              <Link locale="it" href={router.asPath}>
                <a className="tiny-font">{router.locales[1]}</a>
              </Link>
            </li>
            <li className="tiny-font">/</li>
            <li>
              <Link locale="de" href={router.asPath}>
                <a className="tiny-font">{router.locales[2]}</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="burger-menu-info-cnt">
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
      </nav>
    </>
  );
}

export default Navbar;
