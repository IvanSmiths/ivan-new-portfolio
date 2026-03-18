import gsap from "gsap";
import Flip from "gsap/dist/Flip";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import SplitText from "gsap/dist/SplitText";

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(Flip);
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(SplitText);

  if (ScrollTrigger.isTouch) {
    ScrollTrigger.normalizeScroll({
      allowNestedScroll: true,
      lockAxis: false,
      momentum: (self: { velocityY: number }) => {
        const velocity = Math.abs(self.velocityY);
        return Math.min(velocity / 1500, 1.2);
      },
      type: "touch",
    });
  }

  return {
    provide: {
      gsap,
      Flip,
      SplitText: SplitText,
      ScrollTrigger: ScrollTrigger,
    },
  };
});
