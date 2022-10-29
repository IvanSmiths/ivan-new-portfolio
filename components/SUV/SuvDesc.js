import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import SrcImage from "../SrcImage";

function SuvDesc() {
  gsap.registerPlugin(ScrollTrigger);

  const descTriggerRef = useRef(null);
  const stackRef = useRef(null);
  const dateRef = useRef(null);
  const hourRef = useRef(null);

  useEffect(() => {
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: descTriggerRef.current,
        start: "top top",
        end: "2000 bottom",
        scrub: true,
        pin: true,
      },
    });

    tl.to(
      stackRef.current,
      {
        translateY: "-50%",
        bottom: "30%",
      },
      0
    );

    tl.to(
      dateRef.current,
      {
        opacity: 1,
      },
      0
    );

    tl.to(
      stackRef.current,
      {
        opacity: 0.6,
      },
      0
    );

    tl.to(
      dateRef.current,
      {
        translateY: "-50%",
        bottom: "30%",
      },
      1
    );

    tl.to(
      stackRef.current,
      {
        bottom: "70%",
      },
      1
    );

    tl.to(
      dateRef.current,
      {
        opacity: 0.6,
      },
      1
    );

    tl.to(
      hourRef.current,
      {
        opacity: 1,
      },
      1
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section>
      <div ref={descTriggerRef} className="cs__desc-outer">
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
          <ul className="cs__desc-text">
            <li ref={stackRef} className="medium-font">
              Stack: <br /> Vue.js (Nuxt.js), JavaScript, TypeScript, Gsap
            </li>
            <li ref={dateRef} className="medium-font">
              Date: <br />
              12/03/2022 <br />
              Current
            </li>
            <li ref={hourRef} className="medium-font">
              Hour of coding: <br />
              counting...
            </li>
          </ul>
        </div>
      </div>
      <div className="paragraph-block">
        <div className="paragraph-block__caption">
          <h3 className="medium-font">
            First concept, then design è il motto dell azienda. Ogni sito web
            partiva dal wireframing, il primo passaggio essenziale.
          </h3>
        </div>
        <div className="paragraph-block__link-text">
          <div>
            <a
              className="medium-font btn-small-2 btn-small-3"
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
    </section>
  );
}

export default SuvDesc;
