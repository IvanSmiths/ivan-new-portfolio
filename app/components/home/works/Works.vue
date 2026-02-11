<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const works = [
  {
    id: 1,
    title: "Lumina Interface",
    category: "UI Design",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    color: "#ffffff",
  },
  {
    id: 2,
    title: "Apex Architecture",
    category: "3D Concept",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop",
    color: "#2d241f",
  },
  {
    id: 3,
    title: "Nebula Brand",
    category: "Branding",
    image:
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop",
    color: "#1e0a3c",
  },
];

const sectionRef = ref(null);
const trackRef = ref(null);
const cardRefs = ref([]);
const activeIndex = ref(0);
const activeColor = ref(works[0].color);

let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    const cards = cardRefs.value;
    const track = trackRef.value;
    const windowWidth = window.innerWidth;
    const cardWidth = cards[0].offsetWidth;
    const gap = 150; // Wider gap for 3D depth

    // Calculate centering math
    const centerOffset = windowWidth / 2 - cardWidth / 2;
    const startX = windowWidth * 1.2; // Start further right
    const endX = centerOffset - (works.length - 1) * (cardWidth + gap);

    const snapPoints = works.map((_, i) => {
      const targetTrackX = centerOffset - i * (cardWidth + gap);
      return (targetTrackX - startX) / (endX - startX);
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        pin: true,
        scrub: 1.5,
        start: "top top",
        end: "+=3000",
        snap: {
          snapTo: snapPoints,
          duration: 0.5,
          ease: "power2.inOut",
        },
        onUpdate: (self) => {
          const p = self.progress;
          const closest = snapPoints.reduce(
            (prev, curr, index) =>
              Math.abs(curr - p) < Math.abs(snapPoints[prev] - p)
                ? index
                : prev,
            0,
          );

          if (activeIndex.value !== closest) {
            activeIndex.value = closest;
            activeColor.value = works[closest].color;
          }
        },
      },
    });

    // 1. Move the track
    tl.fromTo(track, { x: startX }, { x: endX, ease: "none" });

    // 2. Animate Card Perspective (The "Close to User" feel)
    cards.forEach((card, i) => {
      tl.fromTo(
        card,
        {
          z: 500, // Close to camera
          rotationY: -45, // Angled
          rotationX: 10,
          opacity: 0,
        },
        {
          z: 0,
          rotationY: 0,
          rotationX: 0,
          opacity: 1,
          ease: "power2.out",
        },
        i * 0.2, // Slight stagger relative to track movement
      );
    });
  }, sectionRef.value);
});

onUnmounted(() => ctx?.revert());
</script>

<template>
  <section
    ref="sectionRef"
    :style="{ backgroundColor: activeColor, perspective: '1500px' }"
    class="relative h-screen w-full overflow-hidden transition-colors duration-1000"
  >
    <div class="absolute inset-0 pointer-events-none z-0">
      <div class="absolute top-[10%] left-[20%] w-[1px] h-40 bg-white/20"></div>
      <div
        class="absolute bottom-[10%] right-[20%] w-[1px] h-40 bg-white/20"
      ></div>
    </div>

    <div
      ref="trackRef"
      class="absolute top-0 h-full flex items-center gap-[150px] will-change-transform"
      style="transform-style: preserve-3d"
    >
      <div
        v-for="(work, index) in works"
        :key="work.id"
        ref="cardRefs"
        class="group relative shrink-0 w-[300px] md:w-[400px] aspect-[4/5] cursor-pointer"
        style="transform-style: preserve-3d"
      >
        <div
          class="relative w-full h-full rounded-xl overflow-hidden shadow-2xl transition-transform duration-700 ease-out group-hover:scale-105 group-hover:-translate-y-4"
        >
          <img
            :src="work.image"
            class="w-full h-full object-cover transition-all duration-1000 grayscale-[0.4] group-hover:grayscale-0 group-hover:scale-110"
          />

          <div
            class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500 opacity-60 group-hover:opacity-90"
          ></div>

          <div class="absolute inset-0 p-8 flex flex-col justify-end">
            <div class="overflow-hidden">
              <h2
                class="text-white text-3xl md:text-4xl font-bold translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0"
              >
                {{ work.title }}
              </h2>
            </div>

            <div class="overflow-hidden mt-2">
              <p
                class="text-white/60 text-sm uppercase tracking-widest translate-y-full transition-transform duration-500 ease-out delay-75 group-hover:translate-y-0"
              >
                {{ work.category }}
              </p>
            </div>

            <div
              class="w-0 h-[2px] bg-white mt-4 transition-all duration-700 ease-in-out group-hover:w-full"
            ></div>
          </div>
        </div>

        <div
          class="absolute -bottom-10 left-1/2 -translate-x-1/2 w-4/5 h-4 bg-white/5 blur-xl rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        ></div>
      </div>
    </div>

    <div class="absolute bottom-10 w-full px-12 flex justify-between items-end">
      <div class="text-white/20 font-mono text-xs uppercase tracking-tighter">
        Scroll to navigate / Hover to inspect
      </div>
      <div class="flex gap-3">
        <div
          v-for="(_, i) in works"
          :key="i"
          :class="activeIndex === i ? 'bg-white scale-150' : 'bg-white/20'"
          class="w-2 h-2 rounded-full transition-all duration-500"
        ></div>
      </div>
    </div>
  </section>

  <div class="h-screen bg-black flex items-center justify-center">
    <p class="text-white/20 italic">Fin.</p>
  </div>
</template>
