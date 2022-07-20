/* eslint-disable @next/next/no-img-element */
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
      <div className="case-studio-header-first">
        <h1>Scholz & Volkmer / Vue(Nuxt)</h1>
      </div>
      <img src="/card.jpg" alt="" />

      <div className="case-studio-description">
        <div className="case-studio-description__first-column">
          <h2 className="small-font">
            01 / <span>CONCEPTING</span>
          </h2>
          <h3 className="medium-font">
            A blend of UI and product engineering.
          </h3>
        </div>
        <div className="case-studio-description__second-column">
          <p>
            First concept, then design è il motto dell azienda. Ogni sito web
            partiva dal wireframing, il primo passaggio essenziale per dare al
            progetto delle solide basi. Ho usato Adobe XD per il wireframing, o
            durante un momento di ispirazione, usavo carta e penna. First
            concept, then design è il motto dell azienda. Ogni sito web partiva
            dal wireframing, il primo passaggio essenziale per dare al progetto
            delle solide basi
          </p>
        </div>
      </div>
    </header>
  );
}

export default SuvHeader;
