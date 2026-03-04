<script lang="ts" setup>
import { nextTick, onMounted, onScopeDispose, ref } from "vue";
import { onBeforeRouteLeave } from "vue-router";

const { $gsap, $ScrollTrigger } = useNuxtApp();

const stepSize = 0.1;
const portraits = [
  {
    src: "https://assets.codepen.io/16327/portrait-number-1.png",
    alt: "Portrait number 1",
  },
  {
    src: "https://assets.codepen.io/16327/portrait-number-2.png",
    alt: "Portrait number 2",
  },
  {
    src: "https://assets.codepen.io/16327/portrait-number-3.png",
    alt: "Portrait number 3",
  },
  {
    src: "https://assets.codepen.io/16327/portrait-number-4.png",
    alt: "Portrait number 4",
  },
  {
    src: "https://assets.codepen.io/16327/portrait-number-5.png",
    alt: "Portrait number 5",
  },
  {
    src: "https://assets.codepen.io/16327/portrait-number-1.png",
    alt: "Portrait number 1 duplicate",
  },
  {
    src: "https://assets.codepen.io/16327/portrait-number-2.png",
    alt: "Portrait number 2 duplicate",
  },
  {
    src: "https://assets.codepen.io/16327/portrait-number-3.png",
    alt: "Portrait number 3 duplicate",
  },
  {
    src: "https://assets.codepen.io/16327/portrait-number-4.png",
    alt: "Portrait number 4 duplicate",
  },
  {
    src: "https://assets.codepen.io/16327/portrait-number-5.png",
    alt: "Portrait number 5 duplicate",
  },
];

type ScrollTriggerInstance = {
  direction: number;
  end: number;
  kill: () => void;
  progress: number;
  scroll: (value: number) => void;
  start: number;
  wrapping?: boolean;
};

const galleryRef = ref<HTMLElement | null>(null);
const cardsRef = ref<HTMLElement | null>(null);

let ctx: gsap.Context | null = null;
let scrubToLoop: ((totalTime: number) => void) | null = null;
let getCurrentTime: (() => number) | null = null;
let initFrameId: number | null = null;

function cancelScheduledInit() {
  if (initFrameId === null || typeof window === "undefined") return;
  cancelAnimationFrame(initFrameId);
  initFrameId = null;
}

function cleanup() {
  cancelScheduledInit();
  ctx?.revert();
  ctx = null;
  scrubToLoop = null;
  getCurrentTime = null;
}

function cleanupForRouteLeave() {
  cancelScheduledInit();
  ctx?.kill(false);
  ctx = null;
  scrubToLoop = null;
  getCurrentTime = null;
}

function buildSeamlessLoop(items: HTMLElement[], spacing: number) {
  const overlap = Math.ceil(1 / spacing);
  const startTime = items.length * spacing + 0.5;
  const loopTime = (items.length + overlap) * spacing + 1;
  const rawSequence = $gsap.timeline({ paused: true });
  const seamlessLoop = $gsap.timeline({
    paused: true,
    repeat: -1,
    onRepeat() {
      if (this._time === this._dur) {
        this._tTime += this._dur - 0.01;
      }
    },
  });

  const totalAnimations = items.length + overlap * 2;

  $gsap.set(items, { xPercent: 400, opacity: 0, scale: 0 });

  for (let i = 0; i < totalAnimations; i += 1) {
    const index = i % items.length;
    const item = items[index];
    const time = i * spacing;

    rawSequence
      .fromTo(
        item,
        { scale: 0.5, opacity: 0.5 },
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
        { xPercent: 600 },
        {
          xPercent: -600,
          duration: 1,
          ease: "none",
          immediateRender: false,
        },
        time,
      );

    if (i <= items.length) {
      seamlessLoop.add(`label${i}`, time);
    }
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

function stepBy(delta: number) {
  if (!scrubToLoop || !getCurrentTime) return;
  scrubToLoop(getCurrentTime() + delta);
}

function init() {
  if (!galleryRef.value || !cardsRef.value) return;

  cleanup();

  ctx = $gsap.context(() => {
    const images = Array.from(cardsRef.value?.querySelectorAll<HTMLImageElement>("img") ?? []);
    const cards = Array.from(cardsRef.value?.querySelectorAll<HTMLElement>("li") ?? []);

    if (!cards.length) return;

    let iteration = 0;
    const snap = $gsap.utils.snap(stepSize);
    const seamlessLoop = buildSeamlessLoop(cards, stepSize);
    const scrub = $gsap.to(seamlessLoop, {
      totalTime: 0,
      duration: 0.5,
      ease: "power3",
      paused: true,
    });

    const wrapForward = (activeTrigger: ScrollTriggerInstance) => {
      iteration += 1;
      activeTrigger.wrapping = true;
      activeTrigger.scroll(activeTrigger.start + 1);
    };

    const wrapBackward = (activeTrigger: ScrollTriggerInstance) => {
      iteration -= 1;

      if (iteration < 0) {
        iteration = 9;
        seamlessLoop.totalTime(seamlessLoop.totalTime() + seamlessLoop.duration() * 10);
        scrub.pause();
      }

      activeTrigger.wrapping = true;
      activeTrigger.scroll(activeTrigger.end - 1);
    };

    let trigger: ScrollTriggerInstance | null = null;

    const scrubTo = (totalTime: number) => {
      if (!trigger) return;

      const progress = (totalTime - seamlessLoop.duration() * iteration) / seamlessLoop.duration();

      if (progress > 1) {
        wrapForward(trigger);
      } else if (progress < 0) {
        wrapBackward(trigger);
      } else {
        trigger.scroll(trigger.start + progress * (trigger.end - trigger.start));
      }
    };

    trigger = $ScrollTrigger.create({
      trigger: galleryRef.value,
      start: "top top",
      end: "+=3000",
      pin: true,
      invalidateOnRefresh: true,
      onUpdate(self: ScrollTriggerInstance) {
        if (self.progress === 1 && self.direction > 0 && !self.wrapping) {
          wrapForward(self);
          return;
        }

        if (self.progress < 0.00001 && self.direction < 0 && !self.wrapping) {
          wrapBackward(self);
          return;
        }

        scrub.vars.totalTime = snap((iteration + self.progress) * seamlessLoop.duration());
        scrub.invalidate().restart();
        self.wrapping = false;
      },
    });

    scrubToLoop = scrubTo;
    getCurrentTime = () => Number(scrub.vars.totalTime ?? 0);
  }, galleryRef.value);

  $ScrollTrigger.refresh();
}

async function initAfterLayout() {
  await nextTick();
  if (!galleryRef.value || !cardsRef.value) return;

  await new Promise<void>((resolve) => {
    initFrameId = requestAnimationFrame(() => {
      initFrameId = null;
      resolve();
    });
  });

  if (!galleryRef.value || !cardsRef.value) return;
  init();
}

onMounted(() => {
  void initAfterLayout();
});

onBeforeRouteLeave(() => {
  cleanupForRouteLeave();
});

onScopeDispose(() => {
  cleanup();
});
</script>

<template>
  <div ref="galleryRef" class="bg-background relative min-h-screen overflow-hidden">
    <ul
      ref="cardsRef"
      class="absolute top-1/2 left-1/2 h-96 w-56 -translate-x-1/2 -translate-y-1/2"
    >
      <li
        v-for="portrait in portraits"
        :key="portrait.alt"
        class="absolute inset-0 h-full w-full list-none overflow-hidden"
      >
        <img :alt="portrait.alt" :src="portrait.src" class="h-full w-full object-cover" />
      </li>
    </ul>

    <div class="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">
      <button class="text-foreground text-sm font-medium" type="button" @click="stepBy(-stepSize)">
        Prev
      </button>
      <button class="text-foreground text-sm font-medium" type="button" @click="stepBy(stepSize)">
        Next
      </button>
    </div>
  </div>
</template>
