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
          end: "5000 top",
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
  return (
    <div>
      <div ref={innovationTriggerRef} className="inn-outer">
        <h2 ref={innovationRef} className="extreme-font">
          INNOVATION
        </h2>
      </div>
    </div>
  );
}

export default Innovation;
