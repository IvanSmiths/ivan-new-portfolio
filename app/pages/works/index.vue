<template>
  <div class="h-screen overflow-hidden bg-black text-white">
    <header
      class="fixed top-0 left-0 z-[3] flex h-28 w-full items-center justify-between px-[5%] text-[clamp(0.66rem,2vw,1rem)] tracking-[0.5em] uppercase"
    >
      <div>Animated Sections</div>
      <div>
        <a
          class="text-white no-underline hover:underline"
          href="https://codepen.io/BrianCross/pen/PoWapLP"
          rel="noreferrer"
          target="_blank"
        >
          Original Inspiration
        </a>
      </div>
    </header>

    <section
      v-for="(s, i) in slides"
      :key="s.key"
      ref="sectionRefs"
      class="fixed top-0 h-full w-full invisible"
    >
      <div ref="outerRefs" class="outer h-full w-full overflow-hidden">
        <div ref="innerRefs" class="inner h-full w-full overflow-hidden">
          <div
            ref="bgRefs"
            :class="s.bgPosClass"
            :style="{ backgroundImage: bgImage(s.url) }"
            class="bg absolute top-0 flex h-full w-full items-center justify-center bg-cover bg-center"
          >
            <h2
              class="section-heading z-[2] w-[90vw] max-w-[1200px] text-center font-semibold normal-case leading-[1.2] [font-size:clamp(1rem,6vw,10rem)] [margin-right:-0.5em]"
            >
              {{ s.title }}
            </h2>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import gsap from "gsap";
import Observer from "gsap/Observer";
import SplitText from "gsap/SplitText";

const slides = [
  {
    key: "first",
    title: "Scroll down",
    url: "https://assets.codepen.io/16327/site-landscape-1.jpg",
    bgPosClass: ""
  },
  {
    key: "second",
    title: "Animated with GSAP",
    url: "https://assets.codepen.io/16327/site-landscape-2.jpg",
    bgPosClass: ""
  },
  {
    key: "third",
    title: "GreenSock",
    url: "https://assets.codepen.io/16327/site-landscape-3.jpg",
    bgPosClass: ""
  },
  {
    key: "fourth",
    title: "Animation platform",
    url: "https://assets.codepen.io/16327/site-landscape-4.jpg",
    bgPosClass: ""
  },
  {
    key: "fifth",
    title: "Keep scrolling",
    url: "https://assets.codepen.io/16327/site-landscape-5.jpg",
    bgPosClass: "bg-[position:50%_45%]"
  }
] as const;

const sectionRefs = ref<HTMLElement[]>([]);
const outerRefs = ref<HTMLElement[]>([]);
const innerRefs = ref<HTMLElement[]>([]);
const bgRefs = ref<HTMLElement[]>([]);

function bgImage(url: string) {
  // gradient overlay + image (like your SCSS)
  return `linear-gradient(180deg, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.1) 100%), url("${url}")`;
}

onMounted(async () => {
  // make sure this never runs on SSR
  if (import.meta.server) return;

  gsap.registerPlugin(Observer, SplitText);

  // In Nuxt, refs fill after mount; nextTick helps ensure arrays are populated.
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
        linesClass: "clip-text"
      })
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
      defaults: { duration: 1.25, ease: "power1.inOut" },
      onComplete: () => (animating = false)
    });

    if (currentIndex >= 0) {
      gsap.set(sections[currentIndex], { zIndex: 0 });
      tl.to(images[currentIndex], { yPercent: -15 * dFactor }).set(
        sections[currentIndex],
        { autoAlpha: 0 }
      );
    }

    gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });

    tl.fromTo(
      [outerWrappers[index], innerWrappers[index]],
      { yPercent: (i: number) => (i ? -100 * dFactor : 100 * dFactor) },
      { yPercent: 0 },
      0
    )
      .fromTo(images[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)
      .fromTo(
        splitHeadings[index].chars,
        { autoAlpha: 0, yPercent: 150 * dFactor },
        {
          autoAlpha: 1,
          yPercent: 0,
          duration: 1,
          ease: "power2",
          stagger: { each: 0.02, from: "random" }
        },
        0.2
      );

    currentIndex = index;
  }

  const obs = Observer.create({
    type: "wheel,touch,pointer",
    wheelSpeed: -1,
    onDown: () => !animating && gotoSection(currentIndex - 1, -1),
    onUp: () => !animating && gotoSection(currentIndex + 1, 1),
    tolerance: 10,
    preventDefault: true
  });

  gotoSection(0, 1);

  onBeforeUnmount(() => {
    obs?.kill();
    splitHeadings.forEach((s) => s.revert());
  });
});
</script>

<style scoped>
* {
  box-sizing: border-box;
  user-select: none;
}

.section-heading * {
  will-change: transform;
}
</style>
