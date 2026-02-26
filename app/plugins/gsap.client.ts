import gsap from "gsap";
import Observer from "gsap/dist/Observer";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import SplitText from "gsap/dist/SplitText";

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(Observer);
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(SplitText);

  return {
    provide: {
      gsap,
      gsapObserver: Observer,
      SplitText: SplitText,
      ScrollTrigger: ScrollTrigger,
    },
  };
});
