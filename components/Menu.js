import { useState, useContext } from "react";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import { motion } from "framer-motion";
import { CursorContext } from "./CursorManager";

const Menu = () => {
  const onMouseEnter = () => {
    setDropdown(true);
  };
  const onMouseLeave = () => {
    setDropdown(false);
  };

  const { setSize } = useContext(CursorContext);
  const handleMouseEnter = () => {
    setSize("medium");
  };
  const handleMouseLeave = () => {
    setSize("small");
  };

  const [dropdown, setDropdown] = useState(false);

  let { t } = useTranslation();
  return (
    <div onMouseLeave={onMouseLeave} className="nav-dropdown-cnt">
      <span onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <span onMouseEnter={onMouseEnter} className="tiny-font">
          {t("common:lazy")}
        </span>
      </span>
      <motion.div
        onMouseLeave={onMouseLeave}
        className="nav-dropdown lazy-menu"
      >
        {dropdown && (
          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.2 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
          >
            <li>
              <Link href="/">
                <a
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {" "}
                  {t("common:nav-home")}
                </a>
              </Link>
            </li>
            <li>
              <Link href="/stuff">
                <a
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {" "}
                  {t("common:nav-stuff")}
                </a>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <a
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {" "}
                  {t("common:nav-about")}
                </a>
              </Link>
            </li>
            <li>
              <Link href="/post">
                <a
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {" "}
                  {t("common:nav-post")}
                </a>
              </Link>
            </li>
          </motion.ul>
        )}
      </motion.div>
    </div>
  );
};

export default Menu;
