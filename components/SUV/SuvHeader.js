import React, { useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import Link from "next/link";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { CursorContext } from "../CursorManager";

function SuvHeader() {
  // SKEW
  useEffect(() => {
    let proxy = { skew: 0 },
      skewSetter = gsap.quickSetter(".skewElem", "skewY", "deg"),
      clamp = gsap.utils.clamp(-0.5, 0.5);

    ScrollTrigger.create({
      onUpdate: (self) => {
        let skew = clamp(self.getVelocity() / -2);
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew;
          gsap.to(proxy, {
            skew: 0,
            duration: 0.5,
            ease: "circ",
            overwrite: true,
            onUpdate: () => skewSetter(proxy.skew),
          });
        }
      },
    });
    gsap.set(".skewElem", { transformOrigin: "right center", force3D: true });
  }, []);
  gsap.registerPlugin(ScrollTrigger);

  // MOUSE ZOOM HANDLER //
  const { setSize } = useContext(CursorContext);
  const handleMouseEnter = () => {
    setSize("medium");
  };
  const handleMouseLeave = () => {
    setSize("small");
  };

  let { t } = useTranslation();

  let router = useRouter();
  return (
    <header className="case-studio-header-cnt">
      <div className="case-studio-header-1">
        <h1>Scholz & Volkmer / Vue(Nuxt)</h1>
        <Link href="/stuff" passHref>
          <motion.a
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              padding: `${router.locale === "de" ? "50px 60px" : ""}`,
            }}
            variants={{
              hidden: { y: 0, rotateZ: "0deg", opacity: 0 },
              visible: { y: 0, rotateZ: "11deg", opacity: 1 },
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="tiny-font absolute-small title-link btn-small-2"
          >
            {t("common:nav-stuff")}
          </motion.a>
        </Link>
      </div>
    </header>
  );
}

export default SuvHeader;
