import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const Innovation = () => {
  const innovationRef = useRef(null);
  const innovationTriggerRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const innHero = gsap.fromTo(
      innovationRef.current,
      {
        scale: 1,
      },
      {
        scale: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: innovationTriggerRef.current,
          start: "top top",
          end: "+=2900 top",
          scrub: 0.5,
          ease: "expo.inOut",
          pin: true,
        },
      }
    );
    return () => {
      innHero.kill();
    };
  }, []);

  return (
    <div>
      <div className="home__innovation-outer" ref={innovationTriggerRef}>
        <div className="home__innovation-inner" ref={innovationRef}>
          <h2 className="home__innovation extreme-font">INNOVATION</h2>
        </div>
      </div>
    </div>
  );
};

export default Innovation;
