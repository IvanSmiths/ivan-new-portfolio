import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import SrcImage from "../SrcImage";

function SuvDesc() {
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

  return (
    <section>
      <div ref={descTriggerRef} className="cs__desc-outer">
        <div className="cs__desc-text-mask"></div>
        <div className="cs__desc-inner">
          <div className="cs__desc-image flex-center">
            <SrcImage
              src="/scholz-und-volkmer-website-mobile-4.jpg"
              webp="/scholz-und-volkmer-website-mobile-4.webp"
              height="970px"
              width="1920px"
              alt="image of a website"
            />
          </div>
          <div className="cs__desc-text-wrapper">
            <ul ref={descRef} className="cs__desc-text">
              <li className="medium-font">
                Stack:  <br /> Vue.js (Nuxt.js), React.js (Next.js) JavaScript,
                TypeScript, Gsap
              </li>
              <li className="medium-font">
                Date:  <br />
                15/03/2022 <br />
                31/01/2023
              </li>
              <li className="medium-font">
                Happy clients:  <br />4
              </li>
              <li className="medium-font">
                3.943 <br />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SuvDesc;
