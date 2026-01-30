import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useCollectRefs } from "../ref/useCollectRefs";

gsap.registerPlugin(ScrollTrigger);

export function useAnimatedImages() {
  const { refs: imageRefs, setRef: setImageRef } =
    useCollectRefs<HTMLImageElement>();

  useGSAP(() => {
    imageRefs.current.forEach((img) => {
      if (!img) return;

      gsap.set(img, { width: 0, opacity: 0 });

      gsap.to(img, {
        scrollTrigger: {
          trigger: img,
          start: "top 50%",
          end: "top top",
          scrub: true,
          invalidateOnRefresh: true
        },
        width: "auto",
        opacity: 1,
        ease: "power2.out"
      });
    });

    ScrollTrigger.refresh();
  }, []);

  return { setImageRef };
}
