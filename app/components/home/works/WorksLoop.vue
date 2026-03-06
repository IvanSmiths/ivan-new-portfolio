<script lang="ts" setup>
import { onMounted, ref } from "vue";
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
const loaderCardsRef = ref<HTMLElement | null>(null);
const expandLock = ref(false);
const cardsInteractionAnimation = useCardsInteraction({
  cardsRef,
  metaRef,
  gsap: $gsap,
  lock: expandLock,
});

const cardsLoopAnimation = useCardsLoop({
  cardsRef,
  galleryRef,
  cardGapPx,
  onScrollActivityChange: cardsInteractionAnimation.onScrollActivityChange,
  onSnappedIndexChange: cardsInteractionAnimation.onSnappedIndexChange,
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

onMounted(() => {
  cardsLoaderAnimation.prepare();
  cardsInteractionAnimation.hideAllInfo();

  void cardsLoopAnimation.initAfterLayout().then(() => {
    cardsInteractionAnimation.syncVisibleInfo();

    if (!cardsLoaderAnimation.shouldRunLoader.value) return;
    void cardsLoaderAnimation.play();
  });
});

onBeforeRouteLeave(() => {
  cardsLoaderAnimation.cleanup();
  cardsLoopAnimation.cleanupForRouteLeave();
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
        @mouseenter="cardsInteractionAnimation.onCardEnter(index)"
        @mouseleave="cardsInteractionAnimation.onCardLeave"
      >
        <div class="h-full w-full overflow-hidden">
          <img
            :alt="work.title"
            :src="work.image"
            class="h-full w-full object-cover object-top"
            data-work-image
            draggable="false"
            @click="expandTransition.onImageClick($event, index)"
          />
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
        </div>
      </li>
    </ul>

    <div
      ref="metaRef"
      :class="{ invisible: cardsLoaderAnimation.shouldHideLiveCards.value }"
      class="bottom-xl pointer-events-none fixed left-1/2 z-20 -translate-x-1/2"
    >
      <div
        v-for="({ work, key }, index) in loopWorks"
        :key="`${key}-meta-${index}`"
        class="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center justify-between"
        data-work-meta-group
      >
        <span
          class="text-foreground text-center text-3xl font-black uppercase opacity-0"
          data-work-meta
        >
          {{ work.name }}
        </span>
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

@media (max-width: 1023px) {
  .works-loop-cards {
    --works-grid-columns: 8;
    --works-start-column: 3;
    --works-span-columns: 4;
  }
}
</style>
