import gsap from "gsap";
import Flip from "gsap/dist/Flip";
import Observer from "gsap/dist/Observer";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import SplitText from "gsap/dist/SplitText";

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(Flip);
  gsap.registerPlugin(Observer);
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(SplitText);

  ScrollTrigger.config({
    ignoreMobileResize: true,
  });

  if (ScrollTrigger.isTouch && !ScrollTrigger.normalizeScroll()) {
    ScrollTrigger.normalizeScroll({
      allowNestedScroll: true,
    });
  }

  return {
    provide: {
      gsap,
      Flip,
      gsapObserver: Observer,
      SplitText: SplitText,
      ScrollTrigger: ScrollTrigger,
    },
  };
});
