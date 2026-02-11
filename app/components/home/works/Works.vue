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
    color: "#1a1a1a",
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
    const gap = 150;

    // 1. Calculate the exact movement range
    const centerOffset = windowWidth / 2 - cardWidth / 2;
    const startX = windowWidth; // Cards start just off-screen
    const endX = centerOffset - (works.length - 1) * (cardWidth + gap);

    // The total distance the track will travel
    const totalDistance = startX - endX;

    // 2. Generate snap points based on the distance required to center each card
    const snapPoints = works.map((_, i) => {
      const distanceToCenterThisCard = i * (cardWidth + gap);
      const targetX = centerOffset - distanceToCenterThisCard;
      // Calculate progress (0 to 1) for this specific targetX
      return (startX - targetX) / totalDistance;
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        pin: true,
        scrub: 1,
        start: "top top",
        end: "+=3000",
        snap: {
          snapTo: snapPoints,
          duration: 0.4,
          delay: 0.05,
          ease: "power1.inOut",
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

    // 3. The Combined Animation
    // We animate the track's X position
    tl.fromTo(track, { x: startX }, { x: endX, ease: "none" });

    // 4. Perspective "Swoop"
    // We link the card's 3D rotation to the scroll progress
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        {
          z: 400,
          rotationY: -30,
          opacity: 0.2,
        },
        {
          z: 0,
          rotationY: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            containerAnimation: tl, // This is key! It links the card's 3D flip to the track's movement
            start: "left right", // Start when card enters from right
            end: "center center", // Finish when card is centered
            scrub: true,
          },
        },
      );
    });
  }, sectionRef.value);
});

onUnmounted(() => ctx?.revert());
</script>

<template>
  <section
    ref="sectionRef"
    :style="{ backgroundColor: activeColor, perspective: '1200px' }"
    class="relative h-screen w-full overflow-hidden transition-colors duration-1000 flex items-center"
  >
    <div
      ref="trackRef"
      class="absolute flex items-center gap-[150px] will-change-transform"
      style="transform-style: preserve-3d"
    >
      <div
        v-for="(work, index) in works"
        :key="work.id"
        ref="cardRefs"
        class="group relative shrink-0 w-[300px] md:w-[420px] aspect-[4/5]"
        style="transform-style: preserve-3d"
      >
        <div
          class="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 ease-out group-hover:-translate-y-6 group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.8)]"
        >
          <img
            :src="work.image"
            class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />

          <div
            class="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity"
          ></div>

          <div
            class="absolute inset-0 p-10 flex flex-col justify-end overflow-hidden"
          >
            <div class="overflow-hidden">
              <h2
                class="text-white text-4xl font-black uppercase tracking-tighter translate-y-[110%] transition-transform duration-500 ease-out group-hover:translate-y-0"
              >
                {{ work.title }}
              </h2>
            </div>
            <div class="overflow-hidden mt-1">
              <p
                class="text-white/50 text-xs uppercase tracking-[0.3em] translate-y-[110%] transition-transform duration-500 ease-out delay-75 group-hover:translate-y-0"
              >
                {{ work.category }}
              </p>
            </div>
          </div>
        </div>

        <div
          class="absolute -bottom-12 left-1/2 -translate-x-1/2 w-full h-10 bg-black/40 blur-2xl rounded-[100%] scale-x-75 opacity-50"
        ></div>
      </div>
    </div>

    <div
      class="absolute bottom-10 left-10 text-white/20 text-[10px] font-mono tracking-[0.5em] uppercase"
    >
      0{{ activeIndex + 1 }} / 0{{ works.length }}
    </div>
  </section>
  <div class="h-screen flex justify-center items-center bg-black">
    <span class="text-white"> next section</span>
  </div>
</template>

<style scoped>
section {
  /* This prevents a common perspective bug where items disappear */
  backface-visibility: hidden;
}
</style>
