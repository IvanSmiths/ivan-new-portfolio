import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import SrcImage from "../SrcImage";

function SuvGallery() {
  gsap.registerPlugin(ScrollTrigger);

  const mainImageTriggerRef = useRef(null);
  const mainImageRef = useRef(null);

  useEffect(() => {
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: mainImageTriggerRef.current,
        start: "top top",
        end: "+=" + 5000,
        scrub: true,
        markers: true,
        pin: true,
      },
    });

    tl.to(mainImageRef.current, {
      scale: 0.3,
      duration: 1,
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div>
      <div ref={mainImageTriggerRef} className="cs__gallery-main-image">
        <div ref={mainImageRef}>
          <SrcImage
            classDiv={"flex-center"}
            src={"/scholz-und-volkmer-website-3.jpg"}
            webp={"/scholz-und-volkmer-website-3.webp"}
            height={"970px"}
            width={"1920px"}
            alt={"image of a website"}
          />
        </div>
      </div>
    </div>
  );
}

export default SuvGallery;
