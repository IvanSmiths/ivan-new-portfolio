<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const works = [
  {
    id: 1,
    title: "LIENDE COLLECTION",
    category: "BRANDING, PACK",
    number: "04",
    year: "18",
    bgImage:
      "https://images.unsplash.com/photo-1594146664973-206e8b7d7af3?q=80&w=2574&auto=format&fit=crop",
    innerImage:
      "https://images.unsplash.com/photo-1594146664973-206e8b7d7af3?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "LA VIARTE",
    category: "WEB DESIGN",
    number: "03",
    year: "19",
    bgImage:
      "https://images.unsplash.com/photo-1559563362-c667ba5f5480?q=80&w=2601&auto=format&fit=crop",
    innerImage:
      "https://images.unsplash.com/photo-1559563362-c667ba5f5480?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "OLIVE OIL CO",
    category: "ART DIRECTION",
    number: "02",
    year: "20",
    bgImage:
      "https://images.unsplash.com/photo-1474608137496-0d46fc6e06a6?q=80&w=2574&auto=format&fit=crop",
    innerImage:
      "https://images.unsplash.com/photo-1474608137496-0d46fc6e06a6?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "MODERN WINE",
    category: "PACKAGING",
    number: "01",
    year: "21",
    bgImage:
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=2670&auto=format&fit=crop",
    innerImage:
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=800&auto=format&fit=crop"
  }
];

const mainContainer = ref(null);
const bgStrip = ref(null);
const cardStrip = ref(null);

let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    const totalSlides = works.length;
    const movementLimit = -(totalSlides - 1) * 100;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mainContainer.value,
        start: "top top",
        end: `+=${totalSlides * 100}%`,
        scrub: 1,
        pin: true,
        snap: {
          snapTo: 1 / (totalSlides - 1),
          duration: { min: 0.3, max: 0.8 },
          delay: 0.1,
          ease: "power1.inOut"
        }
      }
    });
    tl.to(
      bgStrip.value,
      {
        yPercent: movementLimit,
        ease: "none"
      },
      0
    );
    tl.to(
      cardStrip.value,
      {
        yPercent: movementLimit,
        ease: "none"
      },
      0
    );
  }, mainContainer.value);
});

onUnmounted(() => {
  ctx.revert();
});
</script>

<template>
  <div
    ref="mainContainer"
    class="relative h-screen w-full overflow-hidden bg-black"
  >
    <div ref="bgStrip" class="absolute inset-0 w-full h-full z-0 flex flex-col">
      <div
        v-for="work in works"
        :key="work.id"
        class="w-full h-screen flex-shrink-0 relative"
      >
        <img
          :src="work.bgImage"
          alt="Background"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-black/20"></div>
      </div>
    </div>

    <div
      class="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] md:w-[60%] lg:w-[40%] h-[300px] md:h-[400px] bg-white shadow-2xl overflow-hidden"
    >
      <div ref="cardStrip" class="w-full h-full flex flex-col">
        <div
          v-for="work in works"
          :key="'card-' + work.id"
          class="w-full h-[300px] md:h-[400px] flex-shrink-0 flex items-center justify-between px-6 md:px-12 relative"
        >
          <div
            class="flex flex-col justify-between h-full py-8 text-xs md:text-sm font-bold tracking-widest uppercase text-gray-800 z-10"
          >
            <span>{{ work.number }}</span>
            <span>{{ work.title }}</span>
          </div>

          <div
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] md:w-[180px] h-[160px] md:h-[240px] shadow-lg overflow-hidden"
          >
            <img :src="work.innerImage" class="w-full h-full object-cover" />
          </div>

          <div
            class="flex flex-col justify-between h-full py-8 text-xs md:text-sm font-bold tracking-widest uppercase text-gray-800 text-right z-10"
          >
            <span>{{ work.year }}</span>
            <span>{{ work.category }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Ensures smooth rendering
*/
img {
  will-change: transform;
  user-select: none;
}
</style>
