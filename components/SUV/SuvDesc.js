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
      bottom: "120%",
      scrollTrigger: {
        trigger: descTriggerRef.current,
        start: "top top",
        end: "4000 bottom",
        ease: "none",
        scrub: true,
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
                Stack: <br /> Vue.js (Nuxt.js), JavaScript, TypeScript, Gsap
              </li>
              <li className="medium-font">
                Date: <br />
                12/03/2022 <br />
                Current
              </li>
              <li className="medium-font">
                Happy clients: <br />4
              </li>
              <li className="medium-font">
                Hour of coding: <br />
                Counting...
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="paragraph-block-outer paragraph-block-outer-first flex-center">
        <div className="paragraph-block-inner">
          <div className="paragraph-block__caption">
            <h3 className="medium-font">
              First concept, then design è il motto dell azienda. Ogni sito web
              partiva dal wireframing, il primo passaggio essenziale.
            </h3>
          </div>
          <div className="paragraph-block__link-text">
            <div>
              <a
                className="medium-font btn-small btn-small-3"
                href="https://www.s-v.de/en/"
              >
                Website
              </a>
            </div>
            <div className="paragraph-block__link-text__p">
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet
                nobis ad saepe unde tempore reprehenderit corrupti corporis,
                doloribus aspernatur similique earum aliquid iure ipsa, quam,
                dolore veritatis commodi necessitatibus numquam?
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SuvDesc;
