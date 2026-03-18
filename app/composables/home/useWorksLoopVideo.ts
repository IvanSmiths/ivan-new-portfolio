import { computed, type Ref } from "vue";

type UseWorksLoopVideoOptions = {
  clickedCardIndex: Ref<number | null>;
  hoveredCardIndex: Ref<number | null>;
  isCardsScrolling: Ref<boolean>;
  isLoopReady: Ref<boolean>;
  shouldHideLiveCards: Ref<boolean>;
  snappedCardIndex: Ref<number>;
};

export function useWorksLoopVideo(options: UseWorksLoopVideoOptions) {
  const activeVideoIndex = computed<number | null>(() => {
    if (!options.isLoopReady.value) return null;
    if (options.shouldHideLiveCards.value) return null;
    if (options.isCardsScrolling.value) return null;

    const visibleIndex = options.hoveredCardIndex.value ?? options.snappedCardIndex.value;
    if (options.clickedCardIndex.value === visibleIndex) return null;

    return visibleIndex;
  });

  async function waitForActiveVideoFadeOut(index: number, durationMs: number) {
    if (activeVideoIndex.value !== index) return;
    if (durationMs <= 0) return;

    await new Promise<void>((resolve) => {
      window.setTimeout(resolve, durationMs);
    });
  }

  return {
    activeVideoIndex,
    waitForActiveVideoFadeOut,
  };
}
