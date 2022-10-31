import React, { useRef, useEffect } from "react";
import SrcImage from "../SrcImage";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

function SuvMobile() {
  gsap.registerPlugin(ScrollTrigger);
  const triggerRef = useRef(null);

  function useArrayRef() {
    const topRefs = useRef([]);
    const bottomRefs = useRef([]);
    topRefs.current = [];
    bottomRefs.current = [];
    return (
      [topRefs, (ref) => ref && topRefs.current.push(ref)],
      [bottomRefs, (ref) => ref && bottomRefs.current.push(ref)]
    );
  }

  const [topRefs, setTopRefs] = useArrayRef();
  const [bottomRefs, setBottomRefs] = useArrayRef();

  useEffect(() => {
    const up = gsap.to(topRefs.current, {
      translateY: -100,
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
    const bottom = gsap.to(bottomRefs.current, {
      translateY: 60,
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
    return () => {
      up.kill();
      bottom.kill();
    };
  }, [topRefs, bottomRefs]);

  return (
    <div ref={triggerRef} className="climax-website-cnt">
      <ul className="climax-website">
        <li ref={setTopRefs} className="flex-center">
          <SrcImage
            classDiv="flex-center"
            src="/scholz-und-volkmer-website-mobile.jpg"
            webp="/scholz-und-volkmer-website-mobile.webp"
            height="834px"
            width="469px"
            alt="image"
          />
        </li>
        <li ref={setBottomRefs} className="flex-center climax-website-margin">
          <SrcImage
            classDiv="flex-center"
            src="/scholz-und-volkmer-website-mobile-2.jpg"
            webp="/scholz-und-volkmer-website-mobile-2.webp"
            height="834px"
            width="469px"
            alt="image"
          />
        </li>
        <li ref={setTopRefs} className="flex-center">
          <SrcImage
            classDiv="flex-center"
            src="/scholz-und-volkmer-website-mobile-3.jpg"
            webp="/scholz-und-volkmer-website-mobile-3.webp"
            height="834px"
            width="469px"
            alt="image"
          />
        </li>
      </ul>
      <ul className="climax-website climax-website-2">
        <li ref={setTopRefs} className="flex-center">
          <SrcImage
            classDiv="flex-center"
            src="/scholz-und-volkmer-website-mobile-4.jpg"
            webp="/scholz-und-volkmer-website-mobile-4.webp"
            height="805px"
            width="469px"
            alt="image"
          />
        </li>
        <li ref={setBottomRefs} className="flex-center climax-website-margin">
          <SrcImage
            classDiv="flex-center"
            src="/scholz-und-volkmer-website-mobile-5.jpg"
            webp="/scholz-und-volkmer-website-mobile-5.webp"
            height="805px"
            width="469px"
            alt="image"
          />
        </li>
        <li ref={setTopRefs} className="flex-center">
          <SrcImage
            classDiv="flex-center"
            src="/scholz-und-volkmer-website-mobile-6.jpg"
            webp="/scholz-und-volkmer-website-mobile-6.webp"
            height="834px"
            width="469px"
            alt="image"
          />
        </li>
      </ul>
    </div>
  );
}

export default SuvMobile;
