<script lang="ts" setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import { useCardsLoader } from "~/composables/animations/home/useCardsLoader";
import { useCardsLoop } from "~/composables/animations/home/useCardsLoop";
import { useCardsInteraction } from "~/composables/animations/home/useCardsInteraction";
import { useCardExpandTransition } from "~/composables/animations/home/useCardExpandTransition";
import { worksCards } from "~/domain/works";

const { $gsap } = useNuxtApp();
const router = useRouter();

const cardGapPx = 20;
const scrollDistancePx = 3000;
const VIDEO_FADE_OUT_DURATION_MS = 320;
const META_ROW_FALLBACK_HEIGHT_PX = 56;
const SNAP_BLIP_FREQUENCY = "A5";
const SNAP_BLIP_DURATION = "32n";
const SNAP_BLIP_VOLUME_DB = -16;
const minimumCards = 20;
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

const galleryRef = ref<HTMLElement | null>(null);
const cardsRef = ref<HTMLElement | null>(null);
const metaRef = ref<HTMLElement | null>(null);
const metaTrackRef = ref<HTMLElement | null>(null);
const loaderCardsRef = ref<HTMLElement | null>(null);
const expandLock = ref(false);
const hoveredCardIndex = ref<number | null>(null);
const snappedCardIndex = ref(0);
const clickedCardIndex = ref<number | null>(null);
const isCardsScrolling = ref(false);
const metaRowHeightPx = ref(META_ROW_FALLBACK_HEIGHT_PX);
const scrollVisualMetaIndex = ref(0);
const metaVisualIndex = ref(loopWorks.length);
let toneModule: typeof import("tone") | null = null;
let snapSynth: import("tone").Synth | null = null;
const cardsInteractionAnimation = useCardsInteraction({
  cardsRef,
  metaRef,
  gsap: $gsap,
  lock: expandLock,
});

const metaLoopItems = Array.from({ length: loopWorks.length * 3 }, (_, index) => {
  const source = loopWorks[index % loopWorks.length];
  if (!source) {
    throw new Error(`Meta source not found at index ${index % loopWorks.length}`);
  }

  return {
    key: `${source.key}-meta-track-${index}`,
    work: source.work,
  };
});

const metaTrackStyle = computed(() => ({
  transform: `translate3d(0, -${metaVisualIndex.value * metaRowHeightPx.value}px, 0)`,
}));

function toContinuousMetaIndex(wrappedIndex: number) {
  const count = loopWorks.length;
  if (count <= 0) return 0;

  const previous = metaVisualIndex.value;
  const cycle = Math.round((previous - wrappedIndex) / count);
  let nextIndex = wrappedIndex + cycle * count;

  const lowerBound = count * 0.5;
  const upperBound = count * 2.5;
  if (nextIndex < lowerBound) {
    nextIndex += count;
  } else if (nextIndex > upperBound) {
    nextIndex -= count;
  }

  return nextIndex;
}

function setMetaVisualFromWrappedIndex(wrappedIndex: number) {
  metaVisualIndex.value = toContinuousMetaIndex(wrappedIndex);
}

function getCardVideos() {
  return Array.from(cardsRef.value?.querySelectorAll<HTMLVideoElement>("[data-work-video]") ?? []);
}

function shouldShowVideo(index: number) {
  if (cardsLoaderAnimation.shouldHideLiveCards.value) return false;
  if (isCardsScrolling.value) return false;
  if (clickedCardIndex.value === index) return false;

  if (hoveredCardIndex.value !== null) {
    return hoveredCardIndex.value === index;
  }

  return snappedCardIndex.value === index;
}

function syncCardVideos() {
  getCardVideos().forEach((video, index) => {
    const shouldShow = shouldShowVideo(index);

    if (!shouldShow) {
      video.pause();
      if (video.currentTime > 0) {
        video.currentTime = 0;
      }
      return;
    }

    if (video.paused) {
      void video.play().catch(() => {});
    }
  });
}

function stopAllVideos() {
  getCardVideos().forEach((video) => {
    video.pause();
    if (video.currentTime > 0) {
      video.currentTime = 0;
    }
  });
}

function syncMetaRowHeight() {
  const firstMetaGroup = metaTrackRef.value?.querySelector<HTMLElement>("[data-work-meta-group]");
  if (!firstMetaGroup) return;

  const nextHeight = Math.round(firstMetaGroup.getBoundingClientRect().height);
  if (nextHeight > 0) {
    metaRowHeightPx.value = nextHeight;
  }
}

function onWindowResize() {
  syncMetaRowHeight();
}

function onCardEnter(index: number) {
  hoveredCardIndex.value = index;
  setMetaVisualFromWrappedIndex(index);
  cardsInteractionAnimation.onCardEnter(index);
}

function onCardLeave() {
  hoveredCardIndex.value = null;
  setMetaVisualFromWrappedIndex(
    isCardsScrolling.value ? scrollVisualMetaIndex.value : snappedCardIndex.value,
  );
  cardsInteractionAnimation.onCardLeave();
}

function onSnappedIndexChange(index: number) {
  snappedCardIndex.value = index;
  if (!isCardsScrolling.value && hoveredCardIndex.value === null) {
    setMetaVisualFromWrappedIndex(index);
  }
  cardsInteractionAnimation.onSnappedIndexChange(index);
}

function onScrollActivityChange(isScrolling: boolean) {
  isCardsScrolling.value = isScrolling;
  if (!isScrolling && hoveredCardIndex.value === null) {
    setMetaVisualFromWrappedIndex(snappedCardIndex.value);
  }
  cardsInteractionAnimation.onScrollActivityChange(isScrolling);
}

function onVisualIndexChange(index: number) {
  scrollVisualMetaIndex.value = index;
  if (hoveredCardIndex.value === null) {
    setMetaVisualFromWrappedIndex(index);
  }
}

async function ensureSnapSynth() {
  if (!import.meta.client) return null;
  if (!toneModule) {
    toneModule = await import("tone");
  }

  if (!snapSynth) {
    snapSynth = new toneModule.Synth({
      oscillator: { type: "sine" },
      envelope: { attack: 0.002, decay: 0.09, sustain: 0, release: 0.08 },
    }).toDestination();
    snapSynth.volume.value = SNAP_BLIP_VOLUME_DB;
  }

  if (toneModule.context.state !== "running") {
    await toneModule.start().catch(() => {});
  }

  return toneModule.context.state === "running" ? snapSynth : null;
}

function playSnapBlip() {
  void ensureSnapSynth().then((synth) => {
    if (!synth || !toneModule) return;
    synth.triggerAttackRelease(SNAP_BLIP_FREQUENCY, SNAP_BLIP_DURATION, toneModule.now());
  });
}

function cleanupSnapAudio() {
  snapSynth?.dispose();
  snapSynth = null;
  toneModule = null;
}

const cardsLoopAnimation = useCardsLoop({
  cardsRef,
  galleryRef,
  cardGapPx,
  onSnap: () => {
    playSnapBlip();
  },
  onScrollActivityChange,
  onSnappedIndexChange,
  onVisualIndexChange,
  scrollDistancePx,
});

const cardsLoaderAnimation = useCardsLoader({
  cardsRef,
  loaderCardsRef,
});

const expandTransition = useCardExpandTransition({
  gsap: $gsap,
  router,
  works: loaderWorks,
  cards: cardsInteractionAnimation.getCardsForTransition,
  images: cardsInteractionAnimation.getImagesForTransition,
  lock: expandLock,
});

async function onCardClick(event: MouseEvent, index: number) {
  if (expandLock.value) return;
  const hadVisibleVideo = shouldShowVideo(index);

  clickedCardIndex.value = index;
  syncCardVideos();
  await nextTick();

  if (hadVisibleVideo) {
    await new Promise<void>((resolve) => {
      window.setTimeout(resolve, VIDEO_FADE_OUT_DURATION_MS);
    });
  }

  await expandTransition.onImageClick(event, index);
}

onMounted(() => {
  cardsLoaderAnimation.prepare();
  cardsInteractionAnimation.hideAllInfo();
  syncCardVideos();
  void nextTick().then(() => syncMetaRowHeight());
  window.addEventListener("resize", onWindowResize, { passive: true });

  void cardsLoopAnimation.initAfterLayout().then(() => {
    cardsInteractionAnimation.syncVisibleInfo();

    if (!cardsLoaderAnimation.shouldRunLoader.value) return;
    void cardsLoaderAnimation.play();
  });
});

watch(
  [
    hoveredCardIndex,
    snappedCardIndex,
    clickedCardIndex,
    isCardsScrolling,
    cardsLoaderAnimation.shouldHideLiveCards,
  ],
  () => {
    syncCardVideos();
  },
  { flush: "post" },
);

watch(
  expandLock,
  (isLocked, wasLocked) => {
    if (wasLocked && !isLocked) {
      clickedCardIndex.value = null;
    }

    syncCardVideos();
  },
  { flush: "post" },
);

onBeforeRouteLeave(() => {
  stopAllVideos();
  cardsLoaderAnimation.cleanup();
  cardsLoopAnimation.cleanupForRouteLeave();
});

onUnmounted(() => {
  window.removeEventListener("resize", onWindowResize);
  stopAllVideos();
  cleanupSnapAudio();
});
</script>

<template>
  <div ref="galleryRef" class="bg-background relative min-h-dvh overflow-hidden">
    <div
      v-if="
        cardsLoaderAnimation.shouldRunLoader.value &&
        cardsLoaderAnimation.loaderPhase.value !== 'done'
      "
      class="bg-background pointer-events-none absolute inset-0 z-30 overflow-hidden"
    >
      <div
        v-if="cardsLoaderAnimation.loaderPhase.value === 'loading'"
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
      :class="{ invisible: cardsLoaderAnimation.shouldHideLiveCards.value }"
      class="works-loop-cards absolute top-1/2 h-96 -translate-y-1/2"
    >
      <li
        v-for="({ work, key }, index) in loopWorks"
        :key="key"
        class="absolute inset-0 h-full w-full cursor-pointer list-none"
        data-work-card
        @mouseenter="onCardEnter(index)"
        @mouseleave="onCardLeave"
      >
        <div class="relative h-full w-full overflow-hidden" data-work-card-shell>
          <div
            v-if="work.clients.length"
            class="bottom-sm left-sm pointer-events-none absolute z-10 flex flex-wrap gap-1"
          >
            <span
              v-for="client in work.clients.slice(0, 3)"
              :key="`${key}-${client}`"
              class="text-foreground bg-background/20 px-sm rounded-full border border-white/20 py-1 text-xs tracking-widest uppercase opacity-0 shadow-lg backdrop-blur-lg"
              data-client-chip
            >
              {{ client }}
            </span>
          </div>
          <div class="h-full w-full" data-work-card-media>
            <img
              :alt="work.title"
              :src="work.image"
              class="works-loop-image h-full object-cover object-top"
              data-work-image
              draggable="false"
              @click="onCardClick($event, index)"
            />
            <video
              :class="shouldShowVideo(index) ? 'opacity-100' : 'opacity-0'"
              class="pointer-events-none absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-300 ease-out"
              data-work-video
              loop
              muted
              playsinline
              preload="metadata"
              src="/test.mp4"
            />
          </div>
        </div>
      </li>
    </ul>

    <div
      ref="metaRef"
      :class="{ invisible: cardsLoaderAnimation.shouldHideLiveCards.value }"
      class="bottom-xl pointer-events-none fixed left-1/2 z-20 h-14 w-max -translate-x-1/2 overflow-hidden"
    >
      <div
        ref="metaTrackRef"
        :class="isCardsScrolling ? 'transition-none' : 'transition-transform duration-300 ease-out'"
        :style="metaTrackStyle"
        class="flex flex-col items-center will-change-transform"
      >
        <div
          v-for="{ work, key } in metaLoopItems"
          :key="key"
          class="flex h-14 items-center justify-center"
          data-work-meta-group
        >
          <span class="text-foreground text-center text-3xl font-black whitespace-nowrap uppercase">
            {{ work.name }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.works-loop-cards {
  --works-grid-columns: 16;
  --works-grid-gap: var(--spacing-md);
  --works-column-size: calc(
    (100% - (var(--works-grid-columns) - 1) * var(--works-grid-gap)) / var(--works-grid-columns)
  );
  --works-start-column: 7;
  --works-span-columns: 4;
  left: calc((var(--works-start-column) - 1) * (var(--works-column-size) + var(--works-grid-gap)));
  width: calc(
    var(--works-span-columns) * var(--works-column-size) + (var(--works-span-columns) - 1) *
      var(--works-grid-gap)
  );
}

.works-loop-image {
  width: calc(100% + 96px);
  max-width: none;
  margin-left: -48px;
  will-change: transform;
}

@media (max-width: 1023px) {
  .works-loop-cards {
    --works-grid-columns: 8;
    --works-start-column: 3;
    --works-span-columns: 4;
  }
}
</style>
