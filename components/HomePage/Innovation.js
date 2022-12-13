import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import useTranslation from "next-translate/useTranslation";

function Innovation() {
  let { t } = useTranslation();
  const innovationRef = useRef(null);
  const innovationTriggerRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    let mm = gsap.matchMedia(),
      breakPoint = 500;

    mm.add(
      {
        isDesktop: `(min-width: ${breakPoint}px)`,
        isMobile: `(max-width: ${breakPoint - 1}px)`,
      },
      (context) => {
        let { isDesktop, isMobile } = context.conditions;
        const innHero = gsap.fromTo(
          innovationRef.current,
          {
            scale: 1,
            translateX: "14.51%",
          },
          {
            scale: 0.1,
            translateX: 0,
            ease: "expo.inOut",
            scrollTrigger: {
              trigger: innovationTriggerRef.current,
              start: "center center",
              end: isDesktop ? "8000 top" : "4000 center",
              scrub: true,
              pin: true,
            },
          }
        );
        return () => {
          innHero.kill();
        };
      }
    );
  }, []);
  return (
    <div>
      <div ref={innovationTriggerRef} className="inn-outer">
        <h2 ref={innovationRef} className="extreme-font">
          {t("home:innovation")}
        </h2>
      </div>
    </div>
  );
}

export default Innovation;
