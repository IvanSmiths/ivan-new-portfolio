<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const works = [
  {
    id: 1,
    title: "Ideology",
    category: "Frontend/Designer",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    color: "bg-yellow-100"
  },
  {
    id: 2,
    title: "Scholz & Volkmer",
    category: "Frontend",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop",
    color: "#2d241f"
  },
  {
    id: 3,
    title: "TD COWEN",
    category: "Fullstack",
    image:
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop",
    color: "#1e0a3c"
  },
  {
    id: 4,
    title: "Neugelb",
    category: "Frontend",
    image:
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop",
    color: "#1e0a3c"
  }
];

const sectionRef = ref(null);
const trackRef = ref(null);
const cardRefs = ref([]);
const bgTextRef = ref(null);
const activeIndex = ref(0);
const activeColor = ref(works[0].color);

let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    const cards = cardRefs.value;
    const track = trackRef.value;
    const windowWidth = window.innerWidth;
    const cardWidth = cards[0].offsetWidth;
    const gap = windowWidth < 768 ? 60 : 150;

    const centerOffset = windowWidth / 2 - cardWidth / 2;
    const startX = windowWidth;
    const endX = centerOffset - (works.length - 1) * (cardWidth + gap);
    const totalDistance = startX - endX;

    const snapPoints = works.map((_, i) => {
      const targetX = centerOffset - i * (cardWidth + gap);
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
          duration: 0.5,
          ease: "power2.inOut"
        },
        onUpdate: (self) => {
          const p = self.progress;
          const closest = snapPoints.reduce(
            (prev, curr, index) =>
              Math.abs(curr - p) < Math.abs(snapPoints[prev] - p)
                ? index
                : prev,
            0
          );

          if (activeIndex.value !== closest) {
            activeIndex.value = closest;
            activeColor.value = works[closest].color;
          }
        }
      }
    });

    tl.fromTo(track, { x: startX }, { x: endX, ease: "none" });
    tl.fromTo(bgTextRef.value, { x: "35%" }, { x: "-20%", ease: "none" }, 0);
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { z: 400, rotationY: -40 },
        {
          z: 0,
          rotationY: 0,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            containerAnimation: tl,
            start: "left right",
            end: "center center",
            scrub: true
          }
        }
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
      ref="bgTextRef"
      class="absolute whitespace-nowrap select-none pointer-events-none flex items-center h-full z-0"
    >
      <transition mode="out-in" name="fade-slide">
        <h3
          :key="activeIndex"
          class="text-[25vh]  font-black uppercase tracking-tighter italic"
        >
          {{ works[activeIndex].title }}
        </h3>
      </transition>
    </div>

    <div
      ref="trackRef"
      class="absolute flex items-center gap-10 md:gap-[150px] will-change-transform z-10"
      style="transform-style: preserve-3d"
    >
      <div
        v-for="(work, index) in works"
        :key="work.id"
        ref="cardRefs"
        class="group relative shrink-0 w-[280px] md:w-[420px] aspect-[4/5]"
        style="transform-style: preserve-3d"
      >
        <div
          :class="activeIndex === index ? 'ring-1 ring-white/20' : ''"
          class="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 ease-out md:group-hover:-translate-y-6"
        >
          <img
            :class="
              activeIndex === index
                ? 'scale-110 grayscale-0'
                : 'scale-100 grayscale-[0.6]'
            "
            :src="work.image"
            class="w-full h-full object-cover transition-all duration-1000"
          />

          <div
            :class="activeIndex === index ? 'opacity-90' : 'opacity-60'"
            class="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent transition-opacity duration-700"
          ></div>

          <div
            class="absolute inset-0 p-6 md:p-10 flex flex-col justify-end overflow-hidden"
          >
            <div class="overflow-hidden">
              <h2
                :class="[
                  activeIndex === index
                    ? 'translate-y-0'
                    : 'md:translate-y-[110%]',
                  'group-hover:translate-y-0',
                ]"
                class="text-white text-3xl md:text-4xl font-black uppercase tracking-tighter transition-transform duration-700 ease-out"
              >
                {{ work.title }}
              </h2>
            </div>
            <div class="overflow-hidden mt-1">
              <p
                :class="[
                  activeIndex === index
                    ? 'translate-y-0'
                    : 'md:translate-y-[110%]',
                  'group-hover:translate-y-0',
                ]"
                class="text-white/50 text-[10px] md:text-xs uppercase tracking-[0.3em] transition-transform duration-700 ease-out delay-75"
              >
                {{ work.category }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="absolute top-10 right-10 flex items-baseline gap-2 overflow-hidden h-10"
    >
      <transition mode="out-in" name="digit-flip">
        <span
          :key="activeIndex"
          class="text-white font-black text-4xl italic leading-none"
        >
          0{{ activeIndex + 1 }}
        </span>
      </transition>
      <span class="text-white/20 font-bold">/ 0{{ works.length }}</span>
    </div>
  </section>
  <div class="h-screen flex justify-center items-center bg-black">
    <span class="text-white"> next section</span>
  </div>
</template>

<style scoped>
section {
  backface-visibility: hidden;
}
</style>
