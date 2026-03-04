<script lang="ts" setup>
import { nextTick, onMounted, onScopeDispose, ref } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import { useWorkExpandTransition } from "~/composables/animations/home/useWorkExpandTransition";
import { useWorksLoaderSession } from "~/composables/animations/work/useWorksLoaderSession";
import { worksCards } from "~/domain/works";

const { $gsap, $ScrollTrigger } = useNuxtApp();
const router = useRouter();
const { hasSeenLoader, markLoaderSeen, notifyLoaderDone } = useWorksLoaderSession();

const stepSize = 0.1;
const minimumCards = Math.ceil(1 / stepSize) + Math.ceil(0.5 / stepSize) + 1;
const repeats = Math.max(3, Math.ceil(minimumCards / worksCards.length));
const loopWorks = Array.from({ length: worksCards.length * repeats }, (_, index) => {
  const work = worksCards[index % worksCards.length];
  if (!work) {
    throw new Error(`Work not found at index ${index % worksCards.length}`);
  }
  return {
    key: `${work.slug}-${index}`,
    work,
  };
});
const loaderWorks = loopWorks.map(({ work }) => work);

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
const loaderCardsRef = ref<HTMLElement | null>(null);
const shouldRunLoader = ref(false);
const shouldHideLiveCards = ref(false);
const loaderPhase = ref<"idle" | "loading" | "animating" | "done">("idle");

let ctx: gsap.Context | null = null;
let scrubToLoop: ((totalTime: number) => void) | null = null;
let getCurrentTime: (() => number) | null = null;
let initFrameId: number | null = null;
let loaderTimeline: gsap.core.Timeline | null = null;
let restoreScrollLock: (() => void) | null = null;
const expandLock = ref(false);

function getCardsForTransition() {
  return Array.from(cardsRef.value?.querySelectorAll<HTMLElement>("li") ?? []);
}

function getImagesForTransition() {
  return Array.from(cardsRef.value?.querySelectorAll<HTMLImageElement>("img") ?? []);
}

function getLoaderShells() {
  return Array.from(
    loaderCardsRef.value?.querySelectorAll<HTMLElement>("[data-loader-shell]") ?? [],
  );
}

function getLoaderCards() {
  return Array.from(
    loaderCardsRef.value?.querySelectorAll<HTMLElement>("[data-loader-card]") ?? [],
  );
}

function getLoaderImages() {
  return Array.from(
    loaderCardsRef.value?.querySelectorAll<HTMLImageElement>("[data-loader-image]") ?? [],
  );
}

const expandTransition = useWorkExpandTransition({
  gsap: $gsap,
  router,
  works: loaderWorks,
  cards: getCardsForTransition,
  images: getImagesForTransition,
  lock: expandLock,
});

function cancelScheduledInit() {
  if (initFrameId === null || typeof window === "undefined") return;
  cancelAnimationFrame(initFrameId);
  initFrameId = null;
}

function lockScroll() {
  if (!import.meta.client || restoreScrollLock) return;

  const htmlOverflow = document.documentElement.style.overflow;
  const bodyOverflow = document.body.style.overflow;

  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";

  restoreScrollLock = () => {
    document.documentElement.style.overflow = htmlOverflow;
    document.body.style.overflow = bodyOverflow;
    restoreScrollLock = null;
  };
}

function unlockScroll() {
  restoreScrollLock?.();
}

function waitForImage(image: HTMLImageElement) {
  if (image.complete) {
    return Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    let settled = false;

    const finish = () => {
      if (settled) return;
      settled = true;
      resolve();
    };

    image.addEventListener("load", finish, { once: true });
    image.addEventListener("error", finish, { once: true });

    if (typeof image.decode === "function") {
      void image
        .decode()
        .then(finish)
        .catch(() => {});
    }
  });
}

function waitForImages(images: HTMLImageElement[]) {
  return Promise.all(images.map((image) => waitForImage(image)));
}

function getLoaderStartRects(targetCards: HTMLElement[]) {
  const firstRect = targetCards[0]?.getBoundingClientRect();
  const targetWidth = firstRect?.width ?? 224;
  const targetHeight = firstRect?.height ?? 384;
  const gap = Math.max(4, Math.round(window.innerHeight * 0.006));
  const maxStackHeight = window.innerHeight * 0.7;
  const maxCardHeight =
    (maxStackHeight - gap * Math.max(0, targetCards.length - 1)) / targetCards.length;
  const startHeight = Math.max(18, Math.min(targetHeight * 0.1, maxCardHeight));
  const startWidth = startHeight * (targetWidth / targetHeight);
  const totalHeight = startHeight * targetCards.length + gap * Math.max(0, targetCards.length - 1);
  const startTop = (window.innerHeight - totalHeight) / 2;
  const startLeft = (window.innerWidth - startWidth) / 2;

  return targetCards.map((_, index) => ({
    x: startLeft,
    y: startTop + index * (startHeight + gap),
    width: startWidth,
    height: startHeight,
  }));
}

function createCenterSpreadData(
  rects: DOMRect[],
  each: number,
): {
  stagger: (index: number, _target: unknown, list: unknown[]) => number;
  zIndices: number[];
} {
  const viewportCenter = window.innerWidth / 2;
  const delays = new Array(rects.length).fill(0);
  const zIndices = new Array(rects.length).fill(1);
  const ordered = rects
    .map((rect, index) => ({
      index,
      distance: Math.abs(rect.left + rect.width / 2 - viewportCenter),
      x: rect.left + rect.width / 2,
    }))
    .sort((a, b) => {
      if (a.distance !== b.distance) return a.distance - b.distance;
      return a.x - b.x;
    });

  ordered.forEach((item, order) => {
    delays[item.index] = order * each;
    zIndices[item.index] = rects.length - order;
  });

  return {
    stagger: (index) => delays[index] ?? 0,
    zIndices,
  };
}

function resetLoaderState() {
  loaderTimeline?.kill();
  loaderTimeline = null;
  shouldHideLiveCards.value = false;
  loaderPhase.value = "done";
  shouldRunLoader.value = false;
  unlockScroll();
}

function completeLoaderRun() {
  markLoaderSeen();
  notifyLoaderDone();
  resetLoaderState();
}

function cleanupLoopContext() {
  ctx?.revert();
  ctx = null;
  scrubToLoop = null;
  getCurrentTime = null;
}

function cleanup() {
  cancelScheduledInit();
  loaderTimeline?.kill();
  loaderTimeline = null;
  unlockScroll();
  cleanupLoopContext();
}

function cleanupForRouteLeave() {
  cancelScheduledInit();
  loaderTimeline?.kill();
  loaderTimeline = null;
  unlockScroll();
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

  $gsap.set(items, { xPercent: 400, scale: 0 });

  for (let i = 0; i < totalAnimations; i += 1) {
    const index = i % items.length;
    const item = items[index];
    if (!item) continue;
    const time = i * spacing;

    rawSequence
      .fromTo(
        item,
        { scale: 0.5 },
        {
          scale: 1,
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

function onWorkClick(event: MouseEvent, index: number) {
  void expandTransition.onImageClick(event, index);
}

function init() {
  if (!galleryRef.value || !cardsRef.value) return;

  cleanupLoopContext();

  ctx = $gsap.context(() => {
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

async function playLoader() {
  const targetCards = getCardsForTransition();
  if (!shouldRunLoader.value || !targetCards.length) {
    completeLoaderRun();
    return;
  }

  loaderPhase.value = "loading";
  await waitForImages(getImagesForTransition());

  if (!shouldRunLoader.value) return;

  loaderPhase.value = "animating";
  await nextTick();
  await waitForImages(getLoaderImages());

  const loaderShells = getLoaderShells();
  const loaderCards = getLoaderCards();
  const loaderImages = getLoaderImages();

  if (
    !loaderShells.length ||
    loaderShells.length !== targetCards.length ||
    loaderCards.length !== targetCards.length
  ) {
    completeLoaderRun();
    return;
  }

  const startRects = getLoaderStartRects(targetCards);
  const targetRects = targetCards.map((card) => card.getBoundingClientRect());
  const { stagger: spreadFromCenter, zIndices: centerZIndices } = createCenterSpreadData(
    targetRects,
    0.03,
  );

  loaderShells.forEach((shell, index) => {
    const startRect = startRects[index];
    if (!startRect) return;

    $gsap.set(shell, {
      x: startRect.x,
      y: startRect.y,
      width: startRect.width,
      height: startRect.height,
      autoAlpha: 1,
      borderRadius: 10,
      zIndex: centerZIndices[index] ?? 1,
      willChange: "transform,width,height,opacity",
    });
  });

  $gsap.set(loaderCards, {
    yPercent: 110,
    autoAlpha: 0,
    willChange: "transform,opacity",
  });
  $gsap.set(loaderImages, { scale: 1.14, willChange: "transform" });

  const completed = await new Promise<boolean>((resolve) => {
    loaderTimeline = $gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => resolve(true),
      onInterrupt: () => resolve(false),
    });

    loaderTimeline
      .to(loaderCards, {
        yPercent: 0,
        autoAlpha: 1,
        duration: 2,
        stagger: 0.05,
      })
      .to(
        loaderShells,
        {
          x: (index) => targetRects[index]?.left ?? 0,
          y: (index) => targetRects[index]?.top ?? 0,
          width: (index) => targetRects[index]?.width ?? 0,
          height: (index) => targetRects[index]?.height ?? 0,
          borderRadius: 0,
          duration: 1.1,
          delay: 0.7,
          ease: "expo.inOut",
          stagger: spreadFromCenter,
        },
        0.24,
      )
      .to(
        loaderImages,
        {
          scale: 1,
          duration: 1.1,
          ease: "power2.out",
          stagger: spreadFromCenter,
        },
        0.24,
      )
      .add(() => {
        shouldHideLiveCards.value = false;
      }, 1.08);
  });

  if (!completed) {
    resetLoaderState();
    return;
  }

  completeLoaderRun();
}

useHead({
  htmlAttrs: {
    class: "home-page bg-background",
  },
});

onMounted(() => {
  shouldRunLoader.value = !hasSeenLoader();
  shouldHideLiveCards.value = shouldRunLoader.value;
  loaderPhase.value = shouldRunLoader.value ? "loading" : "done";

  if (shouldRunLoader.value) {
    lockScroll();
  }

  void initAfterLayout().then(() => {
    if (!shouldRunLoader.value) return;
    void playLoader();
  });
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
    <div
      v-if="shouldRunLoader && loaderPhase !== 'done'"
      class="bg-background pointer-events-none absolute inset-0 z-30 overflow-hidden"
    >
      <div
        v-if="loaderPhase === 'loading'"
        class="text-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm"
      >
        loading
      </div>

      <div v-else ref="loaderCardsRef" class="absolute inset-0">
        <div
          v-for="({ work, key }, index) in loopWorks"
          :key="`${key}-loader-${index}`"
          class="absolute top-0 left-0 overflow-hidden"
          data-loader-shell
        >
          <div class="h-full w-full" data-loader-card>
            <img
              :alt="work.title"
              :src="work.image"
              class="h-full w-full object-cover object-top"
              data-loader-image
              draggable="false"
            />
          </div>
        </div>
      </div>
    </div>

    <ul
      ref="cardsRef"
      :class="{ invisible: shouldHideLiveCards }"
      class="absolute top-1/2 left-1/2 h-96 w-56 -translate-x-1/2 -translate-y-1/2"
    >
      <li
        v-for="({ work, key }, index) in loopWorks"
        :key="key"
        class="absolute inset-0 h-full w-full cursor-pointer list-none overflow-hidden"
      >
        <img
          :alt="work.title"
          :src="work.image"
          class="h-full w-full object-cover object-top"
          draggable="false"
          @click="onWorkClick($event, index)"
        />
      </li>
    </ul>

    <div
      :class="{ 'pointer-events-none invisible': shouldHideLiveCards }"
      class="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3"
    >
      <button class="text-foreground text-sm font-medium" type="button" @click="stepBy(-stepSize)">
        Prev
      </button>
      <button class="text-foreground text-sm font-medium" type="button" @click="stepBy(stepSize)">
        Next
      </button>
    </div>
  </div>
</template>
