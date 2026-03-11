<script lang="ts" setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import { useCardsLoader } from "~/composables/animations/home/useCardsLoader";
import { useCardsLoop } from "~/composables/animations/home/useCardsLoop";
import { useCardsInteraction } from "~/composables/animations/home/useCardsInteraction";
import { useCardExpandTransition } from "~/composables/animations/home/useCardExpandTransition";
import { useCardsLoopTone } from "~/composables/animations/home/useCardsLoopTone";
import { worksCards } from "~/domain/works";

const { $gsap } = useNuxtApp();
const router = useRouter();

const cardGapPx = 20;
const MOBILE_SCROLL_DISTANCE_PX = 30000;
const DESKTOP_SCROLL_DISTANCE_PX = 3000;
const scrollDistancePx =
  import.meta.client && window.matchMedia("(max-width: 767px)").matches
    ? MOBILE_SCROLL_DISTANCE_PX
    : DESKTOP_SCROLL_DISTANCE_PX;
const VIDEO_FADE_OUT_DURATION_MS = 320;
const META_ROW_FALLBACK_HEIGHT_PX = 0;
const minimumCards = 80;
const repeats = Math.max(3, Math.ceil(minimumCards / worksCards.length));
const loaderRepeats = 2;

function createWorksLoopItems(cycles: number) {
  return Array.from({ length: worksCards.length * cycles }, (_, index) => {
    const work = worksCards[index % worksCards.length];
    if (!work) {
      throw new Error(`Work not found at index ${index % worksCards.length}`);
    }

    return {
      key: `${work.slug}-${index}`,
      work,
    };
  });
}

const loopWorks = createWorksLoopItems(repeats);
const loaderLoopWorks = createWorksLoopItems(loaderRepeats);
const loaderWorks = loopWorks.map(({ work }) => work);

const galleryRef = ref<HTMLElement | null>(null);
const cardsRef = ref<HTMLElement | null>(null);
const metaRef = ref<HTMLElement | null>(null);
const metaTrackRef = ref<HTMLElement | null>(null);
const loaderCardsRef = ref<HTMLElement | null>(null);
const isLoopReady = ref(false);
const expandLock = ref(false);
const hoveredCardIndex = ref<number | null>(null);
const snappedCardIndex = ref(0);
const clickedCardIndex = ref<number | null>(null);
const isCardsScrolling = ref(false);
const metaRowHeightPx = ref(META_ROW_FALLBACK_HEIGHT_PX);
const activeVideoIndex = computed<number | null>(() => {
  if (!isLoopReady.value) return null;
  if (cardsLoaderAnimation.shouldHideLiveCards.value) return null;
  if (isCardsScrolling.value) return null;

  const visibleIndex = hoveredCardIndex.value ?? snappedCardIndex.value;
  if (clickedCardIndex.value === visibleIndex) return null;

  return visibleIndex;
});
let scrollVisualMetaIndex = 0;
let metaVisualIndex = loopWorks.length;
const worksLoopTone = useCardsLoopTone({
  centerFrequency: "E5",
  duration: "32n",
  snapFrequency: "A5",
  volumeDb: -16,
});
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

function applyMetaVisualIndex(nextIndex: number, force = false) {
  if (!force && nextIndex === metaVisualIndex) return;

  metaVisualIndex = nextIndex;
  if (!metaTrackRef.value) return;

  metaTrackRef.value.style.transform = `translate3d(0, -${metaVisualIndex * metaRowHeightPx.value}px, 0)`;
}

function toContinuousMetaIndex(wrappedIndex: number) {
  const count = loopWorks.length;
  if (count <= 0) return 0;

  const previous = metaVisualIndex;
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
  applyMetaVisualIndex(toContinuousMetaIndex(wrappedIndex));
}

function syncMetaRowHeight() {
  const firstMetaGroup = metaTrackRef.value?.querySelector<HTMLElement>("[data-work-meta-group]");
  if (!firstMetaGroup) return;

  const nextHeight = Math.round(firstMetaGroup.getBoundingClientRect().height);
  if (nextHeight > 0) {
    metaRowHeightPx.value = nextHeight;
    applyMetaVisualIndex(metaVisualIndex, true);
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
    isCardsScrolling.value ? scrollVisualMetaIndex : snappedCardIndex.value,
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
  scrollVisualMetaIndex = index;
  if (hoveredCardIndex.value === null) {
    setMetaVisualFromWrappedIndex(index);
  }
}

const cardsLoopAnimation = useCardsLoop({
  cardsRef,
  galleryRef,
  cardGapPx,
  onCenterPass: () => {
    worksLoopTone.playCenterBlip();
  },
  onSnap: () => {
    worksLoopTone.playSnapBlip();
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
  const hadVisibleVideo = activeVideoIndex.value === index;
  const clickedImageEl =
    event.currentTarget instanceof HTMLImageElement ? event.currentTarget : null;
  const clickedContainerEl = (clickedImageEl?.parentElement as HTMLElement | null) ?? null;
  const clickedContainerRect = clickedContainerEl?.getBoundingClientRect();
  const clickedContainerBorderRadius = clickedContainerEl
    ? window.getComputedStyle(clickedContainerEl).borderRadius
    : "";
  const expandOriginSnapshot =
    clickedImageEl && clickedContainerRect
      ? {
          borderRadius: clickedContainerBorderRadius,
          containerRect: {
            left: clickedContainerRect.left,
            top: clickedContainerRect.top,
            width: clickedContainerRect.width,
            height: clickedContainerRect.height,
          },
          imageEl: clickedImageEl,
          imageScale: Number($gsap.getProperty(clickedImageEl, "scale")) || 1,
          imageX: Number($gsap.getProperty(clickedImageEl, "x")) || 0,
        }
      : undefined;

  clickedCardIndex.value = index;
  await nextTick();

  if (hadVisibleVideo) {
    await new Promise<void>((resolve) => {
      window.setTimeout(resolve, VIDEO_FADE_OUT_DURATION_MS);
    });
  }

  await expandTransition.onImageClick(event, index, expandOriginSnapshot);
}

onMounted(() => {
  isLoopReady.value = false;
  worksLoopTone.ensureSnapSynth();
  worksLoopTone.installAudioUnlockListeners();
  cardsLoaderAnimation.prepare();
  cardsInteractionAnimation.hideAllInfo();
  void nextTick().then(() => {
    syncMetaRowHeight();
    applyMetaVisualIndex(metaVisualIndex, true);
  });
  window.addEventListener("resize", onWindowResize, { passive: true });

  void cardsLoopAnimation.initAfterLayout().then(() => {
    isLoopReady.value = true;
    cardsInteractionAnimation.syncVisibleInfo();

    if (!cardsLoaderAnimation.shouldRunLoader.value) return;
    void cardsLoaderAnimation.play();
  });
});

watch(
  expandLock,
  (isLocked, wasLocked) => {
    if (wasLocked && !isLocked) {
      clickedCardIndex.value = null;
    }
  },
  { flush: "post" },
);

onBeforeRouteLeave(() => {
  isLoopReady.value = false;
  cardsLoaderAnimation.cleanup();
  cardsLoopAnimation.cleanupForRouteLeave();
});

onUnmounted(() => {
  window.removeEventListener("resize", onWindowResize);
  worksLoopTone.cleanup();
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
      data-home-loader-overlay
    >
      <div
        v-if="cardsLoaderAnimation.loaderPhase.value === 'loading'"
        class="text-foreground absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-sm"
      >
        loading
      </div>

      <div
        ref="loaderCardsRef"
        :class="{ 'opacity-0': cardsLoaderAnimation.loaderPhase.value === 'loading' }"
        class="absolute inset-0"
      >
        <div
          v-for="({ work, key }, index) in loaderLoopWorks"
          :key="`${key}-loader-${index}`"
          class="absolute top-0 left-0 overflow-hidden"
          data-loader-shell
        >
          <div class="h-full w-full" data-loader-card>
            <img
              :alt="work.title"
              :src="work.image"
              class="work-cover-origin h-full"
              data-loader-image
              draggable="false"
            />
          </div>
        </div>
      </div>
    </div>

    <ul
      ref="cardsRef"
      :class="{ invisible: cardsLoaderAnimation.shouldHideLiveCards.value || !isLoopReady }"
      :data-loop-ready="isLoopReady ? '1' : '0'"
      class="works-loop-cards bottom-xl absolute h-[70%]"
      data-home-live-cards
    >
      <li
        v-for="({ work, key }, index) in loopWorks"
        :key="key"
        class="pt-md absolute inset-0 h-full w-full cursor-pointer list-none"
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
              class="work-cover-origin works-loop-image h-full"
              data-work-image
              draggable="false"
              @click="onCardClick($event, index)"
            />
            <Transition name="work-video-fade">
              <video
                v-if="activeVideoIndex === index"
                autoplay
                class="works-loop-video pointer-events-none absolute inset-0 h-full"
                data-work-video
                loop
                muted
                playsinline
                preload="metadata"
                src="/test.mp4"
              />
            </Transition>
          </div>
        </div>
      </li>
    </ul>

    <div
      ref="metaRef"
      :class="{ invisible: cardsLoaderAnimation.shouldHideLiveCards.value || !isLoopReady }"
      class="bottom-md pointer-events-none absolute left-1/2 z-20 h-6 w-max -translate-x-1/2 overflow-hidden"
    >
      <div
        ref="metaTrackRef"
        :class="isCardsScrolling ? 'transition-none' : 'transition-transform duration-300 ease-out'"
        class="flex flex-col items-center will-change-transform"
      >
        <div
          v-for="{ work, key } in metaLoopItems"
          :key="key"
          class="flex h-6 items-center justify-center"
          data-work-meta-group
        >
          <span class="text-foreground text-center text-xl font-bold whitespace-nowrap uppercase">
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
  filter: blur(0px) saturate(1);
  scale: 1;
  transition: filter 250ms ease, scale 250ms ease;
  will-change: transform;
}

.works-loop-cards.is-hover-dimmed [data-work-image] {
  filter: blur(6px) saturate(0);
  scale: 1;
}

.works-loop-cards.is-hover-dimmed [data-work-card].is-hover-active [data-work-image] {
  filter: blur(0px) saturate(1);
  scale: 1.03;
}

.works-loop-video {
  left: calc(var(--work-cover-overscan) * -1);
  right: auto;
  width: calc(100% + (var(--work-cover-overscan) * 2) + 2px);
  max-width: none;
  display: block;
  object-fit: cover;
  object-position: top center;
}

/*they are indeed used. Do not remove*/
.work-video-fade-enter-active,
.work-video-fade-leave-active {
  transition: opacity 300ms ease-out;
}

.work-video-fade-enter-from,
.work-video-fade-leave-to {
  opacity: 0;
}

@media (max-width: 1023px) {
  .works-loop-cards {
    --works-grid-columns: 8;
    --works-start-column: 2;
    --works-span-columns: 6;
  }
}
</style>
