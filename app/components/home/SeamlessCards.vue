<template>
  <ClientOnly>
    <section
      ref="galleryEl"
      class="relative h-screen w-full overflow-hidden bg-zinc-950"
    >
      <ul
        ref="cardsEl"
        aria-label="Portrait gallery"
        class="absolute left-1/2 top-[40%] h-96 w-56 -translate-x-1/2 -translate-y-1/2"
      >
        <li
          v-for="(src, i) in images"
          :key="i"
          class="absolute left-0 top-0 h-fit w-56 list-none overflow-hidden rounded-xl text-center"
        >
          <img
            :src="src"
            alt=""
            class="mx-auto max-w-[90%] opacity-0"
            decoding="async"
            loading="lazy"
          />
        </li>
      </ul>
      <div class="absolute bottom-6 left-1/2 -translate-x-1/2">
        <button
          ref="prevBtnEl"
          class="m-4 inline-flex cursor-pointer items-center justify-center rounded-full border-2 border-zinc-100 bg-zinc-900 px-6 py-3 font-semibold leading-[18px] text-zinc-100 outline-none transition hover:bg-zinc-800 active:scale-[0.99]"
          type="button"
        >
          Prev
        </button>
        <button
          ref="nextBtnEl"
          class="m-4 inline-flex cursor-pointer items-center justify-center rounded-full border-2 border-zinc-100 bg-zinc-900 px-6 py-3 font-semibold leading-[18px] text-zinc-100 outline-none transition hover:bg-zinc-800 active:scale-[0.99]"
          type="button"
        >
          Next
        </button>
      </div>
    </section>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";

const images = [
  "https://assets.codepen.io/16327/portrait-number-1.png",
  "https://assets.codepen.io/16327/portrait-number-2.png",
  "https://assets.codepen.io/16327/portrait-number-3.png",
  "https://assets.codepen.io/16327/portrait-number-4.png",
  "https://assets.codepen.io/16327/portrait-number-5.png",
  "https://assets.codepen.io/16327/portrait-number-1.png",
  "https://assets.codepen.io/16327/portrait-number-2.png",
  "https://assets.codepen.io/16327/portrait-number-3.png",
  "https://assets.codepen.io/16327/portrait-number-4.png",
  "https://assets.codepen.io/16327/portrait-number-5.png",
];

const galleryEl = ref<HTMLElement | null>(null);
const cardsEl = ref<HTMLElement | null>(null);
const prevBtnEl = ref<HTMLButtonElement | null>(null);
const nextBtnEl = ref<HTMLButtonElement | null>(null);

let cleanup: (() => void) | null = null;

onMounted(async () => {
  const gsapModule = await import("gsap");
  const stModule = await import("gsap/ScrollTrigger");

  const gsap = gsapModule.gsap ?? gsapModule.default ?? gsapModule;
  const ScrollTrigger = stModule.ScrollTrigger ?? stModule.default ?? stModule;

  gsap.registerPlugin(ScrollTrigger);

  const root = galleryEl.value;
  const cardsRoot = cardsEl.value;
  if (!root || !cardsRoot) return;

  const cards = Array.from(cardsRoot.querySelectorAll("li"));
  const imgs = Array.from(cardsRoot.querySelectorAll("img"));

  gsap.to(imgs, { opacity: 1, delay: 0.1 });

  let iteration = 0;
  const spacing = 0.1;
  const snap = gsap.utils.snap(spacing);

  const seamlessLoop = buildSeamlessLoop(gsap, cards, spacing);

  const scrub = gsap.to(seamlessLoop, {
    totalTime: 0,
    duration: 0.5,
    ease: "power3",
    paused: true,
  });

  const trigger = ScrollTrigger.create({
    start: 0,
    end: "+=3000",
    pin: root,
    onUpdate(self: any) {
      if (self.progress === 1 && self.direction > 0 && !self.wrapping) {
        wrapForward(self);
      } else if (self.progress < 1e-5 && self.direction < 0 && !self.wrapping) {
        wrapBackward(self);
      } else {
        scrub.vars.totalTime = snap(
          (iteration + self.progress) * seamlessLoop.duration(),
        );
        scrub.invalidate().restart();
        self.wrapping = false;
      }
    },
  });

  function wrapForward(tr: any) {
    iteration++;
    tr.wrapping = true;
    tr.scroll(tr.start + 1);
  }

  function wrapBackward(tr: any) {
    iteration--;
    if (iteration < 0) {
      iteration = 9;
      seamlessLoop.totalTime(
        seamlessLoop.totalTime() + seamlessLoop.duration() * 10,
      );
      scrub.pause();
    }
    tr.wrapping = true;
    tr.scroll(tr.end - 1);
  }

  function scrubTo(totalTime: number) {
    const progress =
      (totalTime - seamlessLoop.duration() * iteration) /
      seamlessLoop.duration();

    if (progress > 1) {
      wrapForward(trigger as any);
    } else if (progress < 0) {
      wrapBackward(trigger as any);
    } else {
      trigger.scroll(trigger.start + progress * (trigger.end - trigger.start));
    }
  }

  const onNext = () => scrubTo((scrub.vars.totalTime as number) + spacing);
  const onPrev = () => scrubTo((scrub.vars.totalTime as number) - spacing);

  nextBtnEl.value?.addEventListener("click", onNext);
  prevBtnEl.value?.addEventListener("click", onPrev);

  cleanup = () => {
    nextBtnEl.value?.removeEventListener("click", onNext);
    prevBtnEl.value?.removeEventListener("click", onPrev);

    try {
      trigger?.kill(true);
    } catch {}
    try {
      scrub?.kill();
    } catch {}
    try {
      seamlessLoop?.kill();
    } catch {}
    try {
      ScrollTrigger?.killAll(false);
    } catch {}
  };
});

onUnmounted(() => cleanup?.());

function buildSeamlessLoop(gsap: any, items: HTMLElement[], spacing: number) {
  const overlap = Math.ceil(1 / spacing);
  const startTime = items.length * spacing + 0.5;
  const loopTime = (items.length + overlap) * spacing + 1;

  const rawSequence = gsap.timeline({ paused: true });
  const seamlessLoop = gsap.timeline({
    paused: true,
    repeat: -1,
    onRepeat() {
      this._time === this._dur && (this._tTime += this._dur - 0.01);
    },
  });

  const l = items.length + overlap * 2;

  gsap.set(items, { xPercent: 400, opacity: 0, scale: 0 });

  for (let i = 0; i < l; i++) {
    const index = i % items.length;
    const item = items[index];
    const time = i * spacing;

    rawSequence
      .fromTo(
        item,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          zIndex: 100,
          duration: 0.5,
          yoyo: true,
          repeat: 1,
          ease: "power1.in",
          immediateRender: false,
        },
        time,
      )
      .fromTo(
        item,
        { xPercent: 400 },
        { xPercent: -400, duration: 1, ease: "none", immediateRender: false },
        time,
      );

    if (i <= items.length) seamlessLoop.add("label" + i, time);
  }

  rawSequence.time(startTime);

  seamlessLoop
    .to(rawSequence, {
      time: loopTime,
      duration: loopTime - startTime,
      ease: "none",
    })
    .fromTo(
      rawSequence,
      { time: overlap * spacing + 1 },
      {
        time: startTime,
        duration: startTime - (overlap * spacing + 1),
        immediateRender: false,
        ease: "none",
      },
    );

  return seamlessLoop;
}
</script>
