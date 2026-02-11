<script setup>
import { onMounted, ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const slow = 1.4;

const container = ref(null);

const phrases = [
  {
    text: "FROM GLOBAL ENTERPRISE",
    font: "font-sans font-bold",
    bg: "#000000",
    color: "#FFFFFF"
  },
  {
    text: "TO LOCAL HEROES",
    font: "font-cursive font-extralight",
    bg: "#FFFFFF",
    color: "#000000"
  },
  {
    text: "I BRING WEBSITES",
    font: "font-sans",
    bg: "#ffffff",
    color: "#000000"
  },
  {
    text: "WITHOUT COMPROMISES.",
    font: "font-cursive",
    bg: "#FFFFFF",
    color: "#000000"
  }
];

const splitText = (text) => {
  return text.split(" ");
};

onMounted(() => {
  const sections = gsap.utils.toArray(".phrase-wrapper");
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container.value,
      start: "top top",
      end: "+=800%",
      scrub: 1,
      pin: true
    }
  });

  sections.forEach((section, i) => {
    const elements = section.querySelectorAll(".anim-unit");

    tl.set(section, { autoAlpha: 1 });
    tl.to(container.value, {
      backgroundColor: phrases[i].bg,
      duration: slow,
      ease: "expo.inOut"
    });
    /* --------------------
       ENTER
    -------------------- */
    switch (i) {
      case 0:
        // FROM GLOBAL ENTERPRISES
        tl.fromTo(
          elements,
          { opacity: 0, letterSpacing: "0.7em" },
          {
            opacity: 1,
            stagger: 0.12,
            letterSpacing: "0em",
            duration: slow,
            ease: "expo.out"
          },
          "<"
        );
        break;

      case 1:
        // TO LOCAL HEROES
        tl.fromTo(
          elements,
          { opacity: 0, scaleY: 0.6, transformOrigin: "bottom", rotateX: 95 },
          {
            opacity: 1,
            scaleY: 1,
            stagger: 0.06,
            rotateX: 0,
            duration: slow,
            ease: "expo.out"
          },
          "<"
        );
        break;

      case 2:
        // I BRING WEBSITES
        tl.fromTo(
          elements,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.1,
            duration: slow,
            ease: "power3.out"
          },
          "<"
        );
        break;

      case 3:
        // WITHOUT COMPROMISES
        tl.fromTo(
          elements,
          { opacity: 0, y: 40, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.04,
            duration: slow,
            ease: "expo.out"
          },
          "<"
        );
        break;
    }
    tl.to({}, { duration: 0.6 });
    /* --------------------
       EXIT
    -------------------- */
    switch (i) {
      // FROM GLOBAL ENTERPRISES
      case 0:
        tl.to(elements, {
          opacity: 0,
          letterSpacing: "-0.15em",
          filter: "blur(10px)",
          duration: 0.9,
          ease: "power4.in"
        });
        break;
      // TO LOCAL HEROES
      case 1:
        tl.to(elements, {
          scale: 1.15,
          scaleY: 0,
          opacity: 0,
          transformOrigin: "top",
          stagger: 0.04,
          duration: 0.9,
          ease: "power4.inOut"
        });
        break;
      // I BRING WEBSITES
      case 2:
        tl.to(elements, {
          y: 30,
          rotateZ: 2,
          opacity: 0,
          stagger: 0.06,
          duration: 0.3,
          ease: "power3.in"
        });
        break;
    }
    tl.set(section, { autoAlpha: 0 });
  });
});
</script>
<template>
  <div ref="container" class="relative w-full h-screen overflow-hidden">
    <div
      v-for="(phrase, index) in phrases"
      :key="index"
      class="phrase-wrapper absolute inset-0 flex items-center justify-center p-6 md:p-20"
    >
      <div class="flex flex-col items-center overflow-hidden">
        <span
          v-for="(word, wIdx) in splitText(phrase.text)"
          :key="wIdx"
          class="flex"
        >
          <span
            v-for="(char, cIdx) in word.split('')"
            :key="cIdx"
            :class="[
              phrase.font,
              'anim-unit inline-block uppercase text-4xl md:text-8xl lg:text-9xl tracking-tight',
            ]"
            :style="{ color: phrase.color }"
          >
            {{ char }}
          </span>
        </span>
      </div>
    </div>
    <div
      class="absolute inset-0 pointer-events-none border-[1rem] border-transparent mix-blend-difference"
    ></div>
  </div>
</template>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@900&family=Libre+Bodoni:ital,wght@0,700;1,700&family=Space+Mono:wght@700&family=Cormorant+Garamond:ital,wght@1,600&display=swap");

.font-mono {
  font-family: "Space Mono", monospace;
  font-weight: 700;
}

.font-cursive {
  font-family: "Cormorant Garamond", serif;
  font-style: italic;
  text-transform: none !important;
}

.anim-unit {
  will-change: transform, opacity, filter;
  transform-style: preserve-3d;
}

.phrase-wrapper {
  opacity: 0;
  visibility: hidden;
}
</style>
