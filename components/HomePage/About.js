/* eslint-disable @next/next/no-img-element */
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

function About() {
  gsap.registerPlugin(ScrollTrigger);
  const refAbout = useRef(null);

  useEffect(() => {
    const element2 = refAbout.current;
    const imageWidth = gsap.fromTo(
      element2.querySelector("#about-image-cnt"),
      {
        scale: 1,
      },
      {
        scale: 0.75,
        duration: 1,
        ease: "none",
        scrollTrigger: {
          trigger: element2.querySelector("#about-image-cnt"),
          start: "top bottom",
          end: "bottom top",
          ease: "power3",
          scrub: true,
        },
      }
    );
    return () => {
      imageWidth.kill();
    };
  }, []);

  return (
    <main ref={refAbout} className="homepage-about-cnt skewElem">
      <div id="about-image-cnt" className="homepage-about-img-cnt">
        <picture className="flex-center">
          <source
            height="908.75px"
            width="605.75px"
            srcSet="/photo-of-me.webp"
            type="image/webp"
          />
          <img
            alt="me"
            decoding="async"
            src="/photo-of-me.jpg"
            height="3635"
            width="2423"
          />
        </picture>
      </div>
      <div id="about" className="homepage-about-p-cnt">
        <div className="about">
          <div className="about-cnt">
            <h2 className="tiny-font ">ivan smiths</h2>
            <h3 className="medium-font">Frontend developer highly focused web experiences</h3>
          </div>
          <p className="small-font">
            Frontend Developer highly focused on UI/UX design and visual experiences, since 3 years professionally in the field.
            <br />
            <br />
            Passionate about 3D modeling and augmented reality, I tend to join these two worlds together.
          </p>
        </div>
      </div>
    </main>
  );
}

export default About;
