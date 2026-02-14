<script lang="ts" setup>
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

type Work = {
  role: string;
  client: string;
  title: string;
  image: string;
};

const sectionEl = ref<HTMLElement | null>(null);
const trackEl = ref<HTMLElement | null>(null);

const works = ref<Work[]>([
  {
    role: "FRONTEND",
    client: "Commerzbank",
    title: "NEUGELB",
    image:
      "https://res.cloudinary.com/deino2cjx/image/upload/v1747943424/portfolio/neugelb/coba_dmqn8n.png"
  },
  {
    role: "FRONTEND",
    client: "TD Cowen / TD Security",
    title: "TD COWEN",
    image:
      "https://res.cloudinary.com/deino2cjx/image/upload/v1747943287/portfolio/td/td_ep0igm.png"
  },
  {
    role: "FRONTEND",
    client: "Deutsche Bahn / Adidas / Nike",
    title: "SCHOLZ&VOLKMER",
    image:
      "https://res.cloudinary.com/deino2cjx/image/upload/v1748080455/portfolio/suv/suv_on7eq5.png"
  },
  {
    role: "DESIGN/FRONTEND",
    client: "Lemon Soda / RE/MAX",
    title: "IDEOLOGY",
    image:
      "https://res.cloudinary.com/deino2cjx/image/upload/v1747943460/portfolio/ideology/id_qmk79w.png"
  },
  {
    role: "DESIGN/FRONTEND",
    client: "Self-initiated",
    title: "PERSONAL",
    image:
      "https://res.cloudinary.com/deino2cjx/image/upload/v1747943460/portfolio/ideology/id_qmk79w.png"
  }
]);

let ctx: gsap.Context | null = null;

onMounted(() => {
  ctx = gsap.context(() => {
    const track = trackEl.value;
    const section = sectionEl.value;
    if (!track || !section) return;

    // How far the track needs to travel = its full scrollable width minus the viewport width
    const getScrollDistance = () => track.scrollWidth - window.innerWidth;

    gsap.fromTo(
      track,
      { x: 0 },
      {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      }
    );
  }, sectionEl.value!);
});

onUnmounted(() => {
  ctx?.revert();
});
</script>

<template>
  <section ref="sectionEl" class="relative h-screen w-screen bg-white">
    <div class="absolute bottom-0 left-0 w-full pb-6">
      <div
        ref="trackEl"
        class="flex items-end gap-6 px-6 will-change-transform"
        style="width: max-content"
      >
        <div v-for="(item, idx) in works" :key="idx" class="w-96 shrink-0">
          <div class="p-2 flex flex-row justify-between items-center">
            <div
              class="text-xs font-semibold uppercase tracking-wider text-black"
            >
              {{ item.role }}
            </div>
            <div
              class="text-center text-xs font-bold tracking-wide text-neutral-800"
            >
              {{ item.title }}
            </div>
          </div>

          <div class="h-90 w-full overflow-hidden bg-neutral-200">
            <img
              :alt="item.title"
              :src="item.image"
              class="h-full w-full object-cover"
              draggable="false"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
