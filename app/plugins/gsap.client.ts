import gsap from "gsap";
import Observer from "gsap/dist/Observer";

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(Observer);
  return {
    provide: {
      gsap,
      gsapObserver: Observer,
    },
  };
});
