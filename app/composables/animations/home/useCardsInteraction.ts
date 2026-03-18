import type { Ref } from "vue";
import { useCardInfo } from "~/composables/animations/home/useCardInfo";
import { useCardHover } from "~/composables/animations/home/useCardHover";

type UseHomeCardsInteractionAnimationOptions = {
  cardsVersion?: Ref<number>;
  getCards: () => HTMLElement[];
  getMetaGroups: () => HTMLElement[];
  getTransitionImages: () => HTMLImageElement[];
  gsap: typeof gsap;
  lock: Ref<boolean>;
  metaVersion?: Ref<number>;
};

export function useCardsInteraction(options: UseHomeCardsInteractionAnimationOptions) {
  function getCardsForTransition() {
    return options.getCards();
  }

  function getImagesForTransition() {
    return options.getTransitionImages();
  }

  const workCardInfoAnimation = useCardInfo({
    cardsVersion: options.cardsVersion,
    getCards: options.getCards,
    getMetaGroups: options.getMetaGroups,
    gsap: options.gsap,
    metaVersion: options.metaVersion,
  });

  const workHover = useCardHover({
    cards: getCardsForTransition,
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
