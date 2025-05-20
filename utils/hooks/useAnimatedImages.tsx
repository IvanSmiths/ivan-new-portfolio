import { useGSAP } from "@gsap/react";
import { useCollectRefs } from "./useCollectRefs";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

export function useAnimatedImages() {
  const { refs: imageRefs, setRef: setImageRef } =
    useCollectRefs<HTMLImageElement>();

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    imageRefs.current.forEach((img) => {
      gsap.set(img, { width: 0, opacity: 0 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: img,
            start: "top 50%",
            end: "top top",
            scrub: 0.5,
          },
        })
        .to(img, {
          width: "auto",
          height: "6rem",
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return { setImageRef };
}
