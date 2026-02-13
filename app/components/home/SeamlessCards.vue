<!-- components/SeamlessCardGallery.vue -->
<template>
  <ClientOnly>
    <section
      ref="galleryEl"
      class="relative h-screen w-full overflow-hidden bg-zinc-950"
    >
      <!-- Card stack anchor -->
      <ul
        ref="cardsEl"
        aria-label="Portrait gallery"
        class="absolute left-1/2 top-[40%] h-96 w-56 -translate-x-1/2 -translate-y-1/2"
      >
        <li
          v-for="(card, i) in cards"
          :key="i"
          class="absolute left-0 top-0 h-fit w-56 list-none overflow-hidden rounded-xl text-center"
          tabindex="0"
          @blur="onLeave"
          @focus="onHover(i)"
          @mouseenter="onHover(i)"
          @mouseleave="onLeave"
        >
          <img
            :alt="card.title"
            :src="card.src"
            class="mx-auto max-w-[90%] opacity-0"
            decoding="async"
            loading="lazy"
          />
        </li>
      </ul>

      <!-- Actions -->
      <div class="absolute bottom-20 left-1/2 -translate-x-1/2">
        <button
          ref="prevBtnEl"
          class="m-4 inline-flex cursor-pointer items-center justify-center rounded-full border-2 border-zinc-100 bg-zinc-900 px-6 py-3 font-semibold leading-[18px] text-zinc-100 outline-none transition hover:bg-zinc-800"
          type="button"
        >
          Prev
        </button>

        <button
          ref="nextBtnEl"
          class="m-4 inline-flex cursor-pointer items-center justify-center rounded-full border-2 border-zinc-100 bg-zinc-900 px-6 py-3 font-semibold leading-[18px] text-zinc-100 outline-none transition hover:bg-zinc-800"
          type="button"
        >
          Next
        </button>
      </div>

      <!-- Bottom text (title + index) -->
      <div class="absolute bottom-6 left-1/2 w-full -translate-x-1/2 px-6">
        <div
          class="mx-auto flex max-w-5xl items-baseline justify-between text-zinc-100"
        >
          <span class="text-lg font-semibold tracking-tight">
            {{ activeTitle }}
          </span>

          <span class="text-lg font-semibold tabular-nums tracking-tight">
            {{ activeIndexLabel }}
          </span>
        </div>
      </div>
    </section>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from "vue";

type Card = { src: string; title: string };

const cards = ref<Card[]>([
  {
    src: "https://assets.codepen.io/16327/portrait-number-1.png",
    title: "Portrait 1"
  },
  {
    src: "https://assets.codepen.io/16327/portrait-number-2.png",
    title: "Portrait 2"
  },
  {
    src: "https://assets.codepen.io/16327/portrait-number-3.png",
    title: "Portrait 3"
  },
  {
    src: "https://assets.codepen.io/16327/portrait-number-4.png",
    title: "Portrait 4"
  },
  {
    src: "https://assets.codepen.io/16327/portrait-number-5.png",
    title: "Portrait 5"
  },
  {
    src: "https://assets.codepen.io/16327/portrait-number-1.png",
    title: "Portrait 1 (Alt)"
  },
  {
    src: "https://assets.codepen.io/16327/portrait-number-2.png",
    title: "Portrait 2 (Alt)"
  },
  {
    src: "https://assets.codepen.io/16327/portrait-number-3.png",
    title: "Portrait 3 (Alt)"
  },
  {
    src: "https://assets.codepen.io/16327/portrait-number-4.png",
    title: "Portrait 4 (Alt)"
  },
  {
    src: "https://assets.codepen.io/16327/portrait-number-5.png",
    title: "Portrait 5 (Alt)"
  }
]);

const galleryEl = ref<HTMLElement | null>(null);
const cardsEl = ref<HTMLElement | null>(null);
const prevBtnEl = ref<HTMLButtonElement | null>(null);
const nextBtnEl = ref<HTMLButtonElement | null>(null);

const hoveredIndex = ref<number | null>(null);

// Defaults when nothing is hovered
const defaultTitle = "works";
const defaultIndexLabel = "00";

const activeTitle = computed(() => {
  if (hoveredIndex.value == null) return defaultTitle;
  return cards.value[hoveredIndex.value]?.title ?? defaultTitle;
});

const activeIndexLabel = computed(() => {
  if (hoveredIndex.value == null) return defaultIndexLabel;
  const n = hoveredIndex.value + 1;
  return String(n).padStart(2, "0");
});

function onHover(i: number) {
  hoveredIndex.value = i;
}

function onLeave() {
  hoveredIndex.value = null;
}

let cleanup: (() => void) | null = null;

onMounted(async () => {
  const gsapModule = await import("gsap");
  const stModule = await import("gsap/ScrollTrigger");

  const gsap =
    (gsapModule as any).gsap ?? (gsapModule as any).default ?? gsapModule;
  const ScrollTrigger =
    (stModule as any).ScrollTrigger ?? (stModule as any).default ?? stModule;

  gsap.registerPlugin(ScrollTrigger);

  const root = galleryEl.value;
  const cardsRoot = cardsEl.value;
  if (!root || !cardsRoot) return;

  const liEls = Array.from(cardsRoot.querySelectorAll("li")) as HTMLElement[];
  const imgEls = Array.from(cardsRoot.querySelectorAll("img")) as HTMLElement[];

  gsap.to(imgEls, { opacity: 1, delay: 0.1 });

  /**
   * ✅ Safe knobs
   * spacing = how much "scroll progress" (and button step) advances per card
   * itemDuration = how long each card takes to traverse (xPercent tween duration)
   *
   * You can change spacing freely now.
   * If you change itemDuration, overlap math will still be correct.
   */
  const spacing = 0.18;
  const itemDuration = 1;

  const snap = gsap.utils.snap(spacing);

  const seamlessLoop = buildSeamlessLoop(gsap, liEls, spacing, itemDuration);

  const scrub = gsap.to(seamlessLoop, {
    totalTime: 0,
    duration: 0.5,
    ease: "power3",
    paused: true
  });

  let iteration = 0;
  const cardCount = liEls.length;

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
          (iteration + self.progress) * seamlessLoop.duration()
        );
        scrub.invalidate().restart();
        self.wrapping = false;
      }
    }
  });

  function wrapForward(tr: any) {
    iteration++;
    tr.wrapping = true;
    tr.scroll(tr.start + 1);
  }

  function wrapBackward(tr: any) {
    iteration--;

    // ✅ No more hard-coded "9" / "* 10"
    if (iteration < 0) {
      iteration = cardCount - 1;

      // keep totalTime in a safe positive range
      seamlessLoop.totalTime(
        seamlessLoop.totalTime() + seamlessLoop.duration() * cardCount
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
    } catch {
    }
    try {
      scrub?.kill();
    } catch {
    }
    try {
      seamlessLoop?.kill();
    } catch {
    }
    try {
      // prefer killing only our trigger, but keep as you had it
      ScrollTrigger?.killAll(false);
    } catch {
    }
  };
});

onUnmounted(() => cleanup?.());

function buildSeamlessLoop(
  gsap: any,
  items: HTMLElement[],
  spacing: number,
  itemDuration = 1
) {
  /**
   * ✅ Make overlap depend on the actual animation window.
   * If itemDuration is 1s and spacing is 0.1, overlap = 10 (same as the demo).
   */
  const overlap = Math.ceil(itemDuration / spacing);

  /**
   * ✅ Remove magic numbers tied to the old spacing.
   * These offsets ensure the rawSequence has "runway" before/after so the loop is seamless.
   */
  const startTime = items.length * spacing + itemDuration * 0.5;
  const loopTime = (items.length + overlap) * spacing + itemDuration;

  const rawSequence = gsap.timeline({ paused: true });
  const seamlessLoop = gsap.timeline({
    paused: true,
    repeat: -1,
    onRepeat() {
      // @ts-ignore
      this._time === this._dur && (this._tTime += this._dur - 0.01);
    }
  });

  const l = items.length + overlap * 2;

  gsap.set(items, { xPercent: 400, opacity: 0 });

  for (let i = 0; i < l; i++) {
    const index = i % items.length;
    const item = items[index];
    const time = i * spacing;

    rawSequence
      .fromTo(
        item,
        { opacity: 0 },
        {
          opacity: 1,
          zIndex: 100,
          duration: itemDuration / 2,
          yoyo: true,
          repeat: 1,
          ease: "power1.in",
          immediateRender: false
        },
        time
      )
      .fromTo(
        item,
        { xPercent: 400 },
        {
          xPercent: -400,
          duration: itemDuration,
          ease: "none",
          immediateRender: false
        },
        time
      );

    if (i <= items.length) seamlessLoop.add("label" + i, time);
  }

  rawSequence.time(startTime);

  seamlessLoop
    .to(rawSequence, {
      time: loopTime,
      duration: loopTime - startTime,
      ease: "none"
    })
    .fromTo(
      rawSequence,
      { time: overlap * spacing + itemDuration },
      {
        time: startTime,
        duration: startTime - (overlap * spacing + itemDuration),
        immediateRender: false,
        ease: "none"
      }
    );

  return seamlessLoop;
}
</script>
