<script lang="ts" setup>
import { nextTick, onMounted, onUnmounted, watch } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import { useCardExpandTransition } from "~/composables/animations/home/useCardExpandTransition";
import { useCardsInteraction } from "~/composables/animations/home/useCardsInteraction";
import { useCardsLoader } from "~/composables/animations/home/useCardsLoader";
import { useCardsLoop } from "~/composables/animations/home/useCardsLoop";
import { useCardsLoopTone } from "~/composables/animations/home/useCardsLoopTone";
import { useWorksLoopElements } from "~/composables/home/useWorksLoopElements";
import { useWorksLoopMeta } from "~/composables/home/useWorksLoopMeta";
import { useWorksLoopNavigation } from "~/composables/home/useWorksLoopNavigation";
import { useWorksLoopState } from "~/composables/home/useWorksLoopState";
import { useWorksLoopVideo } from "~/composables/home/useWorksLoopVideo";
import { worksCards } from "~/domain/works";

const { $gsap } = useNuxtApp();
const router = useRouter();

const state = useWorksLoopState(worksCards);
const {
  cardGapPx,
  clickedCardIndex,
  expandLock,
  hoveredCardIndex,
  isCardsScrolling,
  isLoopReady,
  loaderLoopWorks,
  loaderWorks,
  loopWorks,
  metaLoopItems,
  metaRowHeightPx,
  scrollDistancePx,
  snappedCardIndex,
  videoFadeOutDurationMs,
} = state;

const elements = useWorksLoopElements();
const { cardsRef, galleryRef, loaderCardsRef, metaRef, metaTrackRef } = elements;

const worksLoopTone = useCardsLoopTone({
  centerFrequency: "E5",
  duration: "32n",
  snapFrequency: "A5",
  volumeDb: -16,
});

const cardsLoaderAnimation = useCardsLoader({
  cardsRef,
  loaderCardsRef,
});

const cardsInteractionAnimation = useCardsInteraction({
  cardsVersion: elements.cardsVersion,
  getCards: elements.getCards,
  getMetaGroups: elements.getMetaGroups,
  getTransitionImages: elements.getTransitionImages,
  gsap: $gsap,
  lock: expandLock,
  metaVersion: elements.metaVersion,
});

const worksLoopMeta = useWorksLoopMeta({
  hoveredCardIndex,
  isCardsScrolling,
  loopCount: loopWorks.length,
  metaRowHeightPx,
  metaTrackRef,
  snappedCardIndex,
});

const worksLoopVideo = useWorksLoopVideo({
  clickedCardIndex,
  hoveredCardIndex,
  isCardsScrolling,
  isLoopReady,
  shouldHideLiveCards: cardsLoaderAnimation.shouldHideLiveCards,
  snappedCardIndex,
});
const activeVideoIndex = worksLoopVideo.activeVideoIndex;

function onCardEnter(index: number) {
  hoveredCardIndex.value = index;
  worksLoopMeta.onCardEnter(index);
  cardsInteractionAnimation.onCardEnter(index);
}

function onCardLeave() {
  hoveredCardIndex.value = null;
  worksLoopMeta.onCardLeave();
  cardsInteractionAnimation.onCardLeave();
}

function onSnappedIndexChange(index: number) {
  snappedCardIndex.value = index;
  worksLoopMeta.onSnappedIndexChange(index);
  cardsInteractionAnimation.onSnappedIndexChange(index);
}

function onScrollActivityChange(isScrolling: boolean) {
  isCardsScrolling.value = isScrolling;
  worksLoopMeta.onScrollActivityChange(isScrolling);
  cardsInteractionAnimation.onScrollActivityChange(isScrolling);
}

const cardsLoopAnimation = useCardsLoop({
  cardGapPx,
  cardsRef,
  galleryRef,
  getCards: elements.getCards,
  getImages: elements.getCardImages,
  onCenterPass: () => {
    worksLoopTone.playCenterBlip();
  },
  onScrollActivityChange,
  onSnap: () => {
    worksLoopTone.playSnapBlip();
  },
  onSnappedIndexChange,
  onVisualIndexChange: worksLoopMeta.onVisualIndexChange,
  scrollDistancePx,
});

const expandTransition = useCardExpandTransition({
  gsap: $gsap,
  images: cardsInteractionAnimation.getImagesForTransition,
  lock: expandLock,
  router,
  works: loaderWorks,
  cards: cardsInteractionAnimation.getCardsForTransition,
});

const worksLoopNavigation = useWorksLoopNavigation({
  clickedCardIndex,
  expandTransition,
  gsap: $gsap,
  isLocked: expandLock,
  waitForActiveVideoFadeOut: (index: number) =>
    worksLoopVideo.waitForActiveVideoFadeOut(index, videoFadeOutDurationMs),
});

async function onCardClick(event: MouseEvent, index: number) {
  await worksLoopNavigation.onCardClick(event, index);
}

function onWindowResize() {
  worksLoopMeta.syncMetaRowHeight();
}

onMounted(() => {
  isLoopReady.value = false;
  worksLoopTone.ensureSnapSynth();
  worksLoopTone.installAudioUnlockListeners();
  cardsLoaderAnimation.prepare();
  cardsInteractionAnimation.hideAllInfo();
  void nextTick().then(() => {
    worksLoopMeta.syncMetaRowHeight();
    worksLoopMeta.applyInitialPosition();
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
