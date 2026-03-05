import type { Ref } from "vue";
import { useCardInfo } from "~/composables/animations/home/useCardInfo";
import { useCardHover } from "~/composables/animations/home/useCardHover";

type UseHomeCardsInteractionAnimationOptions = {
  cardsRef: Ref<HTMLElement | null>;
  gsap: typeof gsap;
  lock: Ref<boolean>;
};

export function useCardsInteraction(options: UseHomeCardsInteractionAnimationOptions) {
  function getImages() {
    return Array.from(
      options.cardsRef.value?.querySelectorAll<HTMLImageElement>("[data-work-image]") ?? [],
    );
  }

  function getCardsForTransition() {
    return Array.from(options.cardsRef.value?.querySelectorAll<HTMLElement>("li") ?? []);
  }

  function getImagesForTransition() {
    return Array.from(options.cardsRef.value?.querySelectorAll<HTMLImageElement>("img") ?? []);
  }

  const workCardInfoAnimation = useCardInfo({
    cardsRef: options.cardsRef,
    gsap: options.gsap,
  });

  const workHover = useCardHover({
    gsap: options.gsap,
    images: getImages,
    isLocked: () => options.lock.value,
  });

  function onCardEnter(index: number) {
    if (options.lock.value) return;

    workCardInfoAnimation.setHoveredIndex(index);
    workHover.hoverIn(index);
  }

  function onCardLeave() {
    if (options.lock.value) return;

    workCardInfoAnimation.setHoveredIndex(null);
    workHover.hoverOut();
  }

  function onScrollActivityChange(isScrolling: boolean) {
    workCardInfoAnimation.setScrolling(isScrolling);
  }

  function onSnappedIndexChange(index: number) {
    workCardInfoAnimation.setSnappedIndex(index);
  }

  return {
    getCardsForTransition,
    getImagesForTransition,
    hideAllInfo: workCardInfoAnimation.hideAllInfo,
    onCardEnter,
    onCardLeave,
    onScrollActivityChange,
    onSnappedIndexChange,
    syncVisibleInfo: workCardInfoAnimation.syncVisibleInfo,
  };
}
