<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- Data ---
const works = [
  {
    id: 1,
    title: "Lumina Interface",
    category: "UI Design",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    color: "#ffffff", // Dark Blue
  },
  {
    id: 2,
    title: "Apex Architecture",
    category: "3D Concept",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop",
    color: "#5D4037", // Brown
  },
  {
    id: 3,
    title: "Nebula Brand",
    category: "Branding",
    image:
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop",
    color: "#4A148C", // Deep Purple
  },
];

// --- Refs ---
const sectionRef = ref<HTMLElement | null>(null);
const trackRef = ref<HTMLElement | null>(null);
const cardsRef = ref<HTMLElement[]>([]);
const activeColor = ref(works[0].color); // Start with first color (or neutral)

// Parallax Refs
const bgDotsRef = ref<HTMLElement | null>(null);
const bgLinesRef = ref<HTMLElement | null>(null);

let ctx: gsap.Context;

// --- Helper to generate random positions for decor ---
const randomPos = () => Math.random() * 100;

onMounted(() => {
  ctx = gsap.context(() => {
    const track = trackRef.value!;
    const cards = cardsRef.value;
    const totalCards = cards.length;

    // 1. Calculations
    // We need to know how wide the track is and the window width
    const cardWidth = cards[0].offsetWidth;
    const cardGap = 40; // matches 'gap-10' (10 * 4px)
    // Total width of content inside track
    const totalTrackWidth = cardWidth * totalCards + cardGap * (totalCards - 1);

    const windowWidth = window.innerWidth;

    // Start Position: All the way to the right (offscreen)
    const startX = windowWidth;

    // End Position: The LAST card is centered in the screen
    // Formula: Center of Screen - (Total Width - Half Last Card)
    // Simplification: We want the right edge of the last card to be at (Center + Half Card)
    const endX = windowWidth / 2 - totalTrackWidth + cardWidth / 2;

    // 2. Snap Points Calculation
    // We need to calculate the progress (0 to 1) where EACH card is centered.
    const snapPoints = works.map((_, index) => {
      // Distance from start of track to center of this card
      const distanceToCardCenter =
        index * (cardWidth + cardGap) + cardWidth / 2;

      // The target X value for the track to center this specific card
      const targetX = windowWidth / 2 - distanceToCardCenter;

      // Convert that pixel value into a progress ratio (0 to 1) based on the total movement
      const totalMovement = Math.abs(endX - startX);
      const currentMovement = Math.abs(targetX - startX);

      return currentMovement / totalMovement;
    });

    // 3. Main Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        pin: true, // Pin the container
        scrub: 1, // Smooth scrubbing
        start: "top top",
        end: "+=3000", // Length of the scroll animation
        snap: {
          snapTo: snapPoints, // Snap to our calculated centers
          duration: { min: 0.2, max: 0.8 },
          delay: 0,
          ease: "power2.inOut",
        },
        onUpdate: (self) => {
          // Dynamic Background Logic
          // Find which snap point is closest to current progress to set color
          const progress = self.progress;
          let closestIndex = 0;
          let minDiff = 1;

          snapPoints.forEach((pt, i) => {
            const diff = Math.abs(pt - progress);
            if (diff < minDiff) {
              minDiff = diff;
              closestIndex = i;
            }
          });

          // Animate color smoothly
          if (activeColor.value !== works[closestIndex].color) {
            activeColor.value = works[closestIndex].color;
          }
        },
      },
    });

    // Animate the Track (Cards)
    tl.fromTo(track, { x: startX }, { x: endX, ease: "none" });

    // 4. Parallax Elements (Depth Effect)
    // Dots move slower than foreground (farther away)
    tl.fromTo(
      bgDotsRef.value,
      { x: windowWidth },
      { x: -windowWidth * 0.2, ease: "none" },
      "<", // Start at same time
    );

    // Lines move faster (mid-ground)
    tl.fromTo(
      bgLinesRef.value,
      { x: windowWidth },
      { x: -windowWidth * 0.5, ease: "none" },
      "<",
    );

    // 5. Card Entrance Stagger (Optional Polish)
    // Adds a slight rotation/opacity reveal as they enter
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { rotateY: -15, opacity: 0.5, scale: 0.9 },
        {
          rotateY: 0,
          opacity: 1,
          scale: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            containerAnimation: tl, // Important: Link to horizontal tween
            start: "left center",
            end: "center center",
            scrub: true,
          },
        },
      );
    });
  }, sectionRef.value!); // Scope to section
});

onUnmounted(() => {
  ctx.revert(); // Cleanup GSAP
});
</script>

<template>
  <section
    ref="sectionRef"
    :style="{ backgroundColor: activeColor }"
    class="relative h-screen w-full overflow-hidden flex items-center justify-center transition-colors duration-700 ease-out"
  >
    <div
      class="absolute inset-0 pointer-events-none perspective-bg overflow-hidden"
    >
      <div ref="bgDotsRef" class="absolute inset-0 w-[150vw]">
        <div
          v-for="n in 20"
          :key="`dot-${n}`"
          :style="{
            width: Math.random() * 10 + 4 + 'px',
            height: Math.random() * 10 + 4 + 'px',
            top: randomPos() + '%',
            left: randomPos() + '%',
          }"
          class="absolute rounded-full bg-white opacity-10"
        ></div>
      </div>

      <div ref="bgLinesRef" class="absolute inset-0 w-[150vw]">
        <div
          v-for="n in 10"
          :key="`line-${n}`"
          :style="{
            width: Math.random() * 200 + 50 + 'px',
            height: '1px',
            top: randomPos() + '%',
            left: randomPos() + '%',
            transform: `rotate(${Math.random() * 45 - 22}deg)`,
          }"
          class="absolute bg-white opacity-20"
        ></div>
      </div>
    </div>

    <div
      ref="trackRef"
      class="absolute flex gap-10 items-center will-change-transform"
    >
      <div
        v-for="(work, index) in works"
        :key="work.id"
        ref="cardsRef"
        class="relative group shrink-0 w-[300px] md:w-[400px] aspect-[4/5] bg-black/20 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 shadow-2xl"
      >
        <img
          :alt="work.title"
          :src="work.image"
          class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div
          class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80"
        ></div>

        <div
          class="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500"
        >
          <span
            class="text-xs font-bold uppercase tracking-widest text-white/60 mb-1 block"
          >
            {{ work.category }}
          </span>
          <h3 class="text-2xl md:text-3xl font-bold text-white mb-2">
            {{ work.title }}
          </h3>
          <div
            class="h-0.5 w-0 group-hover:w-full bg-white/80 transition-all duration-500 ease-out"
          ></div>
        </div>
      </div>
    </div>

    <div
      class="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 text-sm animate-pulse"
    >
      Scroll to explore
    </div>
  </section>

  <div class="h-screen bg-black flex items-center justify-center text-white">
    <p>Next Section</p>
  </div>
</template>

<style scoped>
/* Utility for 3D feel */
.perspective-bg {
  perspective: 1000px;
}
</style>
