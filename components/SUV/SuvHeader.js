/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import Link from "next/link";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { CursorContext } from "../CursorManager";
import SrcImage from "../SrcImage";

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
          <div>
            <span className="small-font ">
              Frontend Developer: Vue.js (Nuxt.js)
            </span>
            <h1 className="big-font impact">
              Scholz & Volkmer <br />
            </h1>
          </div>
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
            <SrcImage
              src={"/scholz-und-volkmer-website-2.jpg"}
              webp={"/scholz-und-volkmer-website-2.webp"}
              height={"926px"}
              width={"1900px"}
              alt={"image"}
            />
          </div>
        </div>
      </header>
    </>
  );
}

export default SuvHeader;
