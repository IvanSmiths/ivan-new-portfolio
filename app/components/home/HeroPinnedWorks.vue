<template>
  <section
    ref="sectionEl"
    class="relative h-screen w-screen overflow-hidden bg-white"
  >
    <div class="absolute inset-0" />

    <div class="absolute bottom-0 left-0 w-full pb-6">
      <div class="mx-auto w-full max-w-400 px-6">
        <div class="overflow-hidden">
          <div ref="trackEl" class="flex items-end gap-6 will-change-transform">
            <!-- duplicate items for seamless wrap -->
            <div
              v-for="(item, idx) in loopItems"
              :key="idx"
              class="w-96 shrink-0"
            >
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
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

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
  }
]);

const loopItems = computed(() => [...works.value, ...works.value]);

onMounted(async () => {
  if (!sectionEl.value || !trackEl.value) return;

  // wait for DOM
  await nextTick();

  const ctx = gsap.context(() => {
    const firstSetCount = works.value.length;
    const gap = 24; // gap-6

    const measureFirstSetWidth = () => {
      const children = Array.from(trackEl.value!.children) as HTMLElement[];
      const widths = children
        .slice(0, firstSetCount)
        .reduce((sum, el) => sum + el.offsetWidth, 0);
      return widths + gap * (firstSetCount - 1);
    };

    let firstSetWidth = measureFirstSetWidth();

    // If images affect layout, refresh once they’re likely painted
    requestAnimationFrame(() => {
      firstSetWidth = measureFirstSetWidth();
      ScrollTrigger.refresh();
    });

    // Track movement state
    let x = 0;
    let lastProgress = 0;

    // Tune how much scroll drives movement
    const speed = 2600; // px per full progress delta (0->1)

    const wrapX = (value: number) => gsap.utils.wrap(-firstSetWidth, 0, value);

    gsap.set(trackEl.value, { x: 0 });

    let isTeleporting = false;

    const st = ScrollTrigger.create({
      trigger: sectionEl.value,
      start: "top top",
      end: "+=2000",
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        // --- TELEPORT SCROLL TO CREATE INFINITE RANGE ---
        // when we approach the end, jump back near start
        // when we approach the start, jump near end
        if (!isTeleporting) {
          const nearEnd = self.progress > 0.999;
          const nearStart = self.progress < 0.001;

          if (nearEnd && self.direction === 1) {
            isTeleporting = true;
            // jump to start + 1px
            self.scroll(self.start + 1);
            lastProgress =
              (self.scroll() - self.start) / (self.end - self.start);
            isTeleporting = false;
            return;
          }

          if (nearStart && self.direction === -1) {
            isTeleporting = true;
            // jump to end - 1px
            self.scroll(self.end - 1);
            lastProgress =
              (self.scroll() - self.start) / (self.end - self.start);
            isTeleporting = false;
            return;
          }
        }

        // --- MOVE ONLY WHEN SCROLL CHANGES ---
        const progress = self.progress;
        const delta = progress - lastProgress;
        lastProgress = progress;

        // down => delta + => move left
        // up   => delta - => move right
        x -= delta * speed;

        // seamless wrap in either direction
        x = wrapX(x);
        gsap.set(trackEl.value, { x });
      }
    });

    // Re-measure on resize (keep it simple)
    const onResize = () => {
      firstSetWidth = measureFirstSetWidth();
      // keep x wrapped to new width
      x = gsap.utils.wrap(-firstSetWidth, 0, x);
      gsap.set(trackEl.value, { x });
      st.refresh();
    };

    window.addEventListener("resize", onResize);

    // cleanup
    return () => window.removeEventListener("resize", onResize);
  }, sectionEl);

  onBeforeUnmount(() => ctx.revert());
});
</script>
