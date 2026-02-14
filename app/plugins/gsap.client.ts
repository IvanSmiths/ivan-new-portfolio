import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollTrigger);
});
