<script lang="ts" setup>
import gsap from "gsap";
import Observer from "gsap/dist/Observer";
import SplitText from "gsap/SplitText";
import { worksCards } from "~/domain/works";

const sectionRefs = ref<HTMLElement[]>([]);
const outerRefs = ref<HTMLElement[]>([]);
const innerRefs = ref<HTMLElement[]>([]);
const bgRefs = ref<HTMLElement[]>([]);

let ctx: gsap.Context;

function bgImage(image: string) {
  return `linear-gradient(180deg, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.1) 100%), url("${image}")`;
}

onMounted(async () => {
  if (import.meta.server) return;
  gsap.registerPlugin(Observer, SplitText);

  await nextTick();

  ctx = gsap.context(() => {
    const sections = sectionRefs.value;
    const images = bgRefs.value;
    const outerWrappers = outerRefs.value;
    const innerWrappers = innerRefs.value;

    const headings = gsap.utils.toArray<HTMLElement>(".section-heading");

    const splitHeadings = headings.map(
      (heading) =>
        new SplitText(heading, {
          type: "chars,words,lines",
          linesClass: "clip-text",
        }),
    );

    let currentIndex = -1;
    const wrap = gsap.utils.wrap(0, sections.length);
    let animating = false;

    gsap.set(outerWrappers, { yPercent: 100 });
    gsap.set(innerWrappers, { yPercent: -100 });

    function gotoSection(index: number, direction: number) {
      index = wrap(index);

      const nextSection = sections[index];
      const nextOuter = outerWrappers[index];
      const nextInner = innerWrappers[index];
      const nextImage = images[index];
      const nextHeading = splitHeadings[index];

      if (animating || !nextSection || !nextOuter || !nextInner || !nextImage || !nextHeading) {
        return;
      }

      animating = true;
      const fromTop = direction === -1;
      const dFactor = fromTop ? -1 : 1;

      const tl = gsap.timeline({
        defaults: { duration: 0.8, ease: "power1.inOut" },
        onComplete: () => {
          animating = false;
        },
      });

      if (currentIndex >= 0) {
        const currSection = sections[currentIndex];
        const currImage = images[currentIndex];

        if (currSection && currImage) {
          gsap.set(currSection, { zIndex: 0 });
          tl.to(currImage, { yPercent: -15 * dFactor }).set(currSection, { autoAlpha: 0 });
        }
      }

      gsap.set(nextSection, { autoAlpha: 1, zIndex: 1 });

      tl.fromTo(
        [nextOuter, nextInner],
        { yPercent: (i: number) => (i ? -100 * dFactor : 100 * dFactor) },
        { yPercent: 0 },
        0,
      )
        .fromTo(nextImage, { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)
        .fromTo(
          nextHeading.chars,
          { autoAlpha: 0, yPercent: 150 * dFactor },
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 0.4,
            ease: "power2",
            stagger: { each: 0.05, from: "start" },
          },
          0.2,
        );
      currentIndex = index;
    }

    Observer.create({
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      onDown: () => gotoSection(currentIndex - 1, -1),
      onUp: () => gotoSection(currentIndex + 1, 1),
      tolerance: 10,
      preventDefault: true,
    });

    gotoSection(0, 1);
  });
});

onUnmounted(() => {
  if (ctx) ctx.revert();
});
</script>

<template>
  <div class="h-screen overflow-hidden bg-black text-white">
    <section
      v-for="(work, i) in worksCards"
      :key="work.slug"
      :ref="
        (el) => {
          if (el) sectionRefs[i] = el as HTMLElement;
        }
      "
      class="fixed top-0 h-full w-full invisible"
    >
      <div
        :ref="
          (el) => {
            if (el) outerRefs[i] = el as HTMLElement;
          }
        "
        class="outer h-full w-full overflow-hidden"
      >
        <div
          :ref="
            (el) => {
              if (el) innerRefs[i] = el as HTMLElement;
            }
          "
          class="inner h-full w-full overflow-hidden"
        >
          <div
            :ref="
              (el) => {
                if (el) bgRefs[i] = el as HTMLElement;
              }
            "
            :style="{ backgroundImage: bgImage(work.image) }"
            class="bg absolute top-0 flex h-full w-full items-center justify-center bg-cover bg-center"
          >
            <NuxtLink :to="`/works/${work.slug}`" class="z-10">
              <h2
                class="section-heading w-[90vw] max-w-300 text-center font-semibold normal-case leading-[1.2] text-[clamp(1rem,6vw,10rem)] mr-[-0.5em]"
              >
                {{ work.title }}
              </h2>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
  user-select: none;
}

.section-heading * {
  will-change: transform;
}
</style>
