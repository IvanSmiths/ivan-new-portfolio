<script setup>
import { onMounted, ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (process.client) {
  gsap.registerPlugin(ScrollTrigger);
}

const container = ref(null);

const phrases = [
  {
    text: "FROM GLOBAL ENTERPRISE",
    font: "font-sans",
    bg: "#000000",
    color: "#FFFFFF",
    split: "words",
  },
  {
    text: "TO LOCAL HEROES",
    font: "font-serif",
    bg: "#FFFFFF",
    color: "#000000",
    split: "chars",
  },
  {
    text: "I BRING WEBSITES",
    font: "font-mono",
    bg: "#000000",
    color: "#FFFFFF",
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
      end: "+=500%",
      scrub: 0.8, // Slightly smoother scrub for "serious" feel
      pin: true,
      snap: 1 / (phrases.length - 1),
    },
  });

  sections.forEach((section, i) => {
    const elements = section.querySelectorAll(".anim-unit");
    const isWhiteBg = phrases[i].bg === "#FFFFFF";

    // --- SCENE ENTRANCE ---
    tl.to(
      container.value,
      {
        backgroundColor: phrases[i].bg,
        duration: 0.4,
        ease: "expo.inOut",
      },
      i,
    ).fromTo(
      elements,
      { opacity: 0, y: 80, rotateX: 40 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        stagger: 0.04,
        ease: "expo.out",
        duration: 1,
      },
      i + 0.1,
    );

    // --- SCENE EXIT (Sophisticated Kinetic Effects) ---
    if (i === 0) {
      // Sleek: Words compress and fade
      tl.to(
        elements,
        {
          letterSpacing: "-0.1em",
          opacity: 0,
          filter: "blur(10px)",
          duration: 0.8,
        },
        i + 0.7,
      );
    } else if (i === 1) {
      // Sleek: Letters expand (Tracking-out) and slide up
      tl.to(
        elements,
        {
          letterSpacing: "1em",
          y: -100,
          opacity: 0,
          stagger: 0.01,
          ease: "power4.in",
        },
        i + 0.7,
      );
    } else if (i === 2) {
      // Sleek: "Shutters" effect - words scale Y to 0
      tl.to(
        elements,
        { scaleY: 0, opacity: 0, stagger: 0.05, ease: "expo.inOut" },
        i + 0.7,
      );
    } else if (i === 3) {
      // Final: Elegant fade and focus
      tl.to(
        elements,
        { scale: 1.1, filter: "blur(20px)", opacity: 0, stagger: 0.02 },
        i + 0.7,
      );
    }
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
      <div class="flex flex-wrap justify-center overflow-hidden">
        <span
          v-for="(unit, uIdx) in splitText(phrase.text, phrase.split)"
          :key="uIdx"
          :class="[
            phrase.font,
            'anim-unit inline-block font-bold uppercase text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.9]',
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

/* High-End Font Stacks */
.font-sans {
  font-family: "Inter", sans-serif;
  font-weight: 900;
}

.font-serif {
  font-family: "Libre Bodoni", serif;
  font-style: italic;
}

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
  perspective: 2000px;
}
</style>
