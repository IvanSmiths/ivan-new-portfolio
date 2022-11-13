import React, { useRef, useEffect } from "react";
import SrcImage from "../SrcImage";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

function IdMobile() {
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
    <div ref={triggerRef} className="desktop climax-website-cnt">
      <ul className="climax-website">
        <li ref={setTopRefs} className="flex-center">
          <SrcImage
            src="/ideology-website-mobile-1.jpg"
            webp="/ideology-website-mobile-1.webp"
            height="681px"
            width="428px"
            alt="image"
          />
        </li>
        <li
          ref={setBottomRefs}
          className="flex-center desktop climax-website-margin"
        >
          <SrcImage
            src="/ideology-website-mobile-2.jpg"
            webp="/ideology-website-mobile-2.webp"
            height="555px"
            width="344px"
            alt="image"
          />
        </li>
        <li ref={setTopRefs} className="flex-center">
          <SrcImage
            src="/ideology-website-mobile-13.jpg"
            webp="/ideology-website-mobile-13.webp"
            height="744px"
            width="390px"
            alt="image"
          />
        </li>
      </ul>
      <ul className="climax-website climax-website-2">
        <li ref={setTopRefs} className="flex-center">
          <SrcImage
            src="/ideology-website-mobile-4.jpg"
            webp="/ideology-website-mobile-4.webp"
            height="572px"
            width="343px"
            alt="image"
          />
        </li>
        <li ref={setBottomRefs} className="flex-center climax-website-margin">
          <SrcImage
            src="/ideology-website-mobile-5.jpg"
            webp="/ideology-website-mobile-5.webp"
            height="572px"
            width="342px"
            alt="image"
          />
        </li>
        <li ref={setTopRefs} className="flex-center">
          <SrcImage
            src="/ideology-website-mobile-6.jpg"
            webp="/ideology-website-mobile-6.webp"
            height="573px"
            width="353px"
            alt="image"
          />
        </li>
      </ul>
    </div>
  );
}

export default IdMobile;
