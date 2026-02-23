import gsap from "gsap";
import Observer from "gsap/dist/Observer";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(Observer);
  gsap.registerPlugin(ScrollTrigger);
  return {
    provide: {
      gsap,
      gsapObserver: Observer,
      ScrollTrigger: ScrollTrigger,
    },
  };
});
