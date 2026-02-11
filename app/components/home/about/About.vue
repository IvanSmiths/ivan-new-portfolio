<script setup>
import { onMounted, ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const container = ref(null);

const phrases = [
  {
    text: "FROM",
    font: "font-sans",
    bg: "#000000",
    color: "#ffffff",
    split: "words",
  },
  {
    text: "GLOBAL ENTERPRISE",
    font: "font-sans",
    bg: "#000000",
    color: "#FFFFFF",
    split: "words",
  },
  {
    text: "TO",
    font: "font-serif",
    bg: "#FFFFFF",
    color: "#000000",
    split: "chars",
  },
  {
    text: "LOCAL HEROES",
    font: "font-serif",
    bg: "#FFFFFF",
    color: "#000000",
    split: "chars",
  },
  {
    text: "I BRING WEBSITES",
    font: "font-mono",
    bg: "#ffffff",
    color: "#000000",
    split: "words",
  },
  {
    text: "WITHOUT COMPROMISES.",
    font: "font-cursive",
    bg: "#FFFFFF",
    color: "#000000",
    split: "chars",
  },
];

const splitText = (text, type) => {
  if (type === "chars")
    return text.split("").map((c) => (c === " " ? "\u00A0" : c));
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
      pin: true,
    },
  });

  let t = 0;

  sections.forEach((section, i) => {
    const elements = section.querySelectorAll(".anim-unit");

    // Show section
    tl.set(section, { autoAlpha: 1 }, t);

    // Background transition
    tl.to(
      container.value,
      {
        backgroundColor: phrases[i].bg,
        duration: 0.6,
        ease: "expo.inOut",
      },
      t,
    );

    /* --------------------
       ENTER — UNIQUE PER PHRASE
    -------------------- */
    switch (i) {
      case 0:
        // FROM — subtle rise, strong clarity
        tl.fromTo(
          elements,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 1,
            ease: "expo.out",
          },
          t + 0.2,
        );
        break;

      case 1:
        // GLOBAL ENTERPRISE — tracking reveal
        tl.fromTo(
          elements,
          { opacity: 0, letterSpacing: "0.4em" },
          {
            opacity: 1,
            letterSpacing: "0em",
            stagger: 0.08,
            duration: 1.2,
            ease: "power4.out",
          },
          t + 0.2,
        );
        break;

      case 2:
        // TO — vertical compression
        tl.fromTo(
          elements,
          { opacity: 0, scaleY: 0.6, transformOrigin: "bottom" },
          {
            opacity: 1,
            scaleY: 1,
            stagger: 0.06,
            duration: 0.9,
            ease: "expo.out",
          },
          t + 0.2,
        );
        break;

      case 3:
        // LOCAL HEROES — depth + perspective
        tl.fromTo(
          elements,
          { opacity: 0, y: 80, rotateX: 35 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            stagger: 0.05,
            duration: 1.3,
            ease: "expo.out",
          },
          t + 0.2,
        );
        break;

      case 4:
        // I BRING WEBSITES — lateral confidence
        tl.fromTo(
          elements,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.1,
            duration: 1,
            ease: "power3.out",
          },
          t + 0.2,
        );
        break;

      case 5:
        // WITHOUT COMPROMISES — refined blur reveal
        tl.fromTo(
          elements,
          { opacity: 0, y: 40, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.04,
            duration: 1.4,
            ease: "expo.out",
          },
          t + 0.2,
        );
        break;
    }

    // HOLD
    tl.to({}, { duration: 0.6 });
    t += 1.8;

    /* --------------------
       EXIT — UNIQUE (same as before)
    -------------------- */
    switch (i) {
      case 0:
        tl.to(elements, {
          opacity: 0,
          letterSpacing: "-0.15em",
          filter: "blur(10px)",
          duration: 0.9,
          ease: "power4.in",
        });
        break;

      case 1:
        tl.to(elements, {
          y: -40,
          opacity: 0,
          stagger: 0.02,
          duration: 0.8,
          ease: "expo.inOut",
        });
        break;

      case 2:
        tl.to(elements, {
          scaleY: 0,
          opacity: 0,
          transformOrigin: "top",
          stagger: 0.05,
          duration: 0.9,
          ease: "expo.inOut",
        });
        break;

      case 3:
        tl.to(elements, {
          scale: 1.15,
          opacity: 0,
          stagger: 0.04,
          duration: 0.9,
          ease: "power4.inOut",
        });
        break;

      case 4:
        tl.to(elements, {
          y: 30,
          rotateZ: 2,
          opacity: 0,
          stagger: 0.06,
          duration: 0.8,
          ease: "power3.in",
        });
        break;
    }
    tl.set(section, { autoAlpha: 0 });
    t += 1.2;
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
      <div
        class="flex flex-wrap justify-center overflow-hidden text-nowrap whitespace-nowrap"
      >
        <span
          v-for="(unit, uIdx) in splitText(phrase.text, phrase.split)"
          :key="uIdx"
          :class="[
            phrase.font,
            'anim-unit inline-block font-bold uppercase text-5xl md:text-7xl text-nowrap whitespace-nowrap lg:text-8xl tracking-tight leading-[0.9]',
          ]"
          :style="{ color: phrase.color }"
        >
          {{ unit }}
          <span v-if="phrase.split === 'words'">&nbsp;</span>
        </span>
      </div>
    </div>

    <div
      class="absolute inset-0 pointer-events-none border-[1rem] border-transparent mix-blend-difference"
    >
      <div
        class="absolute top-10 left-10 text-[10px] tracking-[0.5em] text-white uppercase font-mono"
      >
        Portfolio / 2026
      </div>
      <div
        class="absolute bottom-10 right-10 text-[10px] tracking-[0.5em] text-white uppercase font-mono"
      >
        Scroll to explore
      </div>
    </div>
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
