import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import SrcImage from "../SrcImage";
import useTranslation from "next-translate/useTranslation";

function CgDesc() {
  gsap.registerPlugin(ScrollTrigger);

  const descTriggerRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    var desc = gsap.to(descRef.current, {
      bottom: "130%",
      ease: "none",
      scrollTrigger: {
        trigger: descTriggerRef.current,
        start: "top top",
        end: "4000 bottom",
        scrub: 2,
        pin: true,
      },
    });

    return () => {
      desc.kill();
    };
  }, []);

  let { t } = useTranslation();

  return (
    <section>
      <div ref={descTriggerRef} className="cs__desc-outer">
        <div className="cs__desc-text-mask"></div>
        <div className="cs__desc-inner">
          <div className="cs__desc-image flex-center">
            <SrcImage
              src="/cgprospect.jpg"
              webp="/cgprospect.webp"
              height="970px"
              width="1920px"
              alt="image of a website"
            />
          </div>
          <div className="cs__desc-text-wrapper">
            <ul ref={descRef} className="cs__desc-text">
              <li className="medium-font">
                {t("cg-prospect:stack")} <br />
                React.js (Next.js), PostgreSql, Prisma
              </li>
              <li className="medium-font">
                {t("cg-prospect:date")} <br />
                3/09/2021 <br />
                {t("cg-prospect:current")}
              </li>
              <li className="medium-font">
                {t("cg-prospect:coding")} <br />
                {t("cg-prospect:hours")}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CgDesc;
