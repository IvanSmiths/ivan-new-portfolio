import { useGSAP } from "@gsap/react";
import { useCollectRefs } from "../ref/useCollectRefs";
import { gsap } from "gsap";

export function useAnimatedImages() {
  const { refs: imageRefs, setRef: setImageRef } =
    useCollectRefs<HTMLImageElement>();

  useGSAP(() => {
    imageRefs.current.forEach((img) => {
      gsap.set(img, { width: 0, opacity: 0 });
      gsap.to(img, {
        scrollTrigger: {
          trigger: img,
          start: "top 50%",
          end: "top top",
          scrub: true,
        },
        width: "auto",
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
      });
    });
  }, []);

  return { setImageRef };
}
