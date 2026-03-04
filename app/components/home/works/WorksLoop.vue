<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import { useHomeCardsLoaderAnimation } from "~/composables/animations/home/useHomeCardsLoaderAnimation";
import { useHomeCardsLoopAnimation } from "~/composables/animations/home/useHomeCardsLoopAnimation";
import { useWorkExpandTransition } from "~/composables/animations/home/useWorkExpandTransition";
import { worksCards } from "~/domain/works";

const { $gsap } = useNuxtApp();
const router = useRouter();

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

const galleryRef = ref<HTMLElement | null>(null);
const cardsRef = ref<HTMLElement | null>(null);
const loaderCardsRef = ref<HTMLElement | null>(null);
const expandLock = ref(false);

const cardsLoopAnimation = useHomeCardsLoopAnimation({
  cardsRef,
  galleryRef,
  stepSize,
});

const cardsLoaderAnimation = useHomeCardsLoaderAnimation({
  cardsRef,
  loaderCardsRef,
});

const expandTransition = useWorkExpandTransition({
  gsap: $gsap,
  router,
  works: loaderWorks,
  cards: () => Array.from(cardsRef.value?.querySelectorAll<HTMLElement>("li") ?? []),
  images: () => Array.from(cardsRef.value?.querySelectorAll<HTMLImageElement>("img") ?? []),
  lock: expandLock,
});

function stepBy(delta: number) {
  cardsLoopAnimation.stepBy(delta);
}

function onWorkClick(event: MouseEvent, index: number) {
  void expandTransition.onImageClick(event, index);
}

onMounted(() => {
  cardsLoaderAnimation.prepare();

  void cardsLoopAnimation.initAfterLayout().then(() => {
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
  <div ref="galleryRef" class="bg-background relative min-h-screen overflow-hidden">
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
      class="absolute top-1/2 left-1/2 h-96 w-80 -translate-x-1/2 -translate-y-1/2"
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
      :class="{ 'pointer-events-none invisible': cardsLoaderAnimation.shouldHideLiveCards.value }"
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
