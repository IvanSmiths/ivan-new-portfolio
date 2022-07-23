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
    <>
      <header className="case-studio-header">
        <div className="case-studio-header__first-row">
          <h1 className="medium-font impact">
            Scholz & Volkmer <br /> Frontend developer: Vue.js (Nuxt.js)
          </h1>
          <Link href="/">
            <a>website</a>
          </Link>
        </div>
        <div className="case-studio-header__second-row">
          <div>
            <div className="case-studio-header__second-row__first-list">
              <ul>
                <li className="bold">Tech:</li>
                <li>Frontend: Vue.js (Nuxt.js)</li>
                <li>Animation: Gsap</li>
                <li>Style: Scss/Sass</li>
              </ul>
              <ul>
                <li className="bold">Date:</li>
                <li>12/03/2022</li>
                <li>Current</li>
              </ul>
            </div>
            <div className="case-studio-header__second-row__first-list second-row__second-list">
              <ul>
                <li className="bold">Clients:</li>
                <li>Adidas</li>
                <li>WFM</li>
              </ul>
            </div>
          </div>
          <div className="case-studio-header__second-row__image">
            <img
              src="/cg-prospect-website-1.jpg"
              height="200"
              width="auto"
              alt=""
            />
          </div>
        </div>
      </header>
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
      <div className="case-studio__screen-image">
        <img
          src="/cg-prospect-website-1.jpg"
          height="200"
          width="auto"
          alt=""
        />
      </div>
    </>
  );
}

export default SuvHeader;
