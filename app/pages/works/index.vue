<script lang="ts" setup>
import gsap from "gsap";
import Observer from "gsap/dist/Observer";
import SplitText from "gsap/SplitText";
import { worksCards } from "~/domain/works";

const sectionRefs = ref<(HTMLElement | null)[]>([]);
const outerRefs = ref<(HTMLElement | null)[]>([]);
const innerRefs = ref<(HTMLElement | null)[]>([]);
const bgRefs = ref<(HTMLElement | null)[]>([]);

function bgImage(image: string) {
  return `linear-gradient(180deg, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.1) 100%), url("${image}")`;
}

onMounted(async () => {
  if (import.meta.server) return;

  gsap.registerPlugin(Observer, SplitText);

  await nextTick();

  const sections = sectionRefs.value;
  const images = bgRefs.value;
  const headings = gsap.utils.toArray<HTMLElement>(".section-heading");
  const outerWrappers = outerRefs.value;
  const innerWrappers = innerRefs.value;

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
      gsap.set(sections[currentIndex]!, { zIndex: 0 });
      tl.to(images[currentIndex]!, { yPercent: -15 * dFactor }).set(sections[currentIndex]!, {
        autoAlpha: 0,
      });
    }

    gsap.set(sections[index]!, { autoAlpha: 1, zIndex: 1 });

    tl.fromTo(
      [outerWrappers[index]!, innerWrappers[index]!],
      { yPercent: (i: number) => (i ? -100 * dFactor : 100 * dFactor) },
      { yPercent: 0 },
      0,
    )
      .fromTo(images[index]!, { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)
      .fromTo(
        splitHeadings[index]!.chars,
        { autoAlpha: 0, yPercent: 150 * dFactor, opacity: 0 },
        {
          autoAlpha: 1,
          yPercent: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2",
          stagger: { each: 0.05, from: "start" },
        },
        0.2,
      );

    currentIndex = index;
  }

  const obs = Observer.create({
    type: "wheel,touch,pointer",
    wheelSpeed: -1,
    onDown: () => !animating && gotoSection(currentIndex - 1, -1),
    onUp: () => !animating && gotoSection(currentIndex + 1, 1),
    tolerance: 10,
    preventDefault: true,
  });

  gotoSection(0, 1);

  onBeforeUnmount(() => {
    obs?.kill();
    splitHeadings.forEach((s) => s.revert());
  });
});
</script>

<template>
  <div class="h-screen overflow-hidden bg-black text-white">
    <section
      v-for="(work, i) in worksCards"
      :key="i"
      ref="sectionRefs"
      class="fixed top-0 h-full w-full invisible"
    >
      <div ref="outerRefs" class="outer h-full w-full overflow-hidden">
        <div ref="innerRefs" class="inner h-full w-full overflow-hidden">
          <div
            ref="bgRefs"
            :style="{ backgroundImage: bgImage(work.image) }"
            class="bg absolute top-0 flex h-full w-full items-center justify-center bg-cover bg-center"
          >
            <h2
              class="section-heading z-2 w-[90vw] max-w-300 text-center font-semibold normal-case leading-[1.2] text-[clamp(1rem,6vw,10rem)] mr-[-0.5em]"
            >
              {{ work.title }}
            </h2>
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
