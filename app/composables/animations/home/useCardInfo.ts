import { ref, type Ref } from "vue";

type UseWorkCardInfoAnimationOptions = {
  cardsRef: Ref<HTMLElement | null>;
  metaRef: Ref<HTMLElement | null>;
  gsap: typeof gsap;
};

type CardInfoElements = {
  clients: HTMLElement[];
  meta: HTMLElement[];
};

export function useCardInfo(options: UseWorkCardInfoAnimationOptions) {
  const hoveredCardIndex = ref<number | null>(null);
  const isScrollingCards = ref(false);
  const snappedCardIndex = ref(0);

  function getCards() {
    return Array.from(
      options.cardsRef.value?.querySelectorAll<HTMLElement>("[data-work-card]") ?? [],
    );
  }

  function getMetaGroups() {
    return Array.from(
      options.metaRef.value?.querySelectorAll<HTMLElement>("[data-work-meta-group]") ?? [],
    );
  }

  function getInfoByCard(): CardInfoElements[] {
    const cards = getCards();
    const metaGroups = getMetaGroups();

    return cards.map((card, index) => ({
      clients: Array.from(card.querySelectorAll<HTMLElement>("[data-client-chip]")),
      meta: Array.from(
        (metaGroups[index] ?? card).querySelectorAll<HTMLElement>("[data-work-meta]"),
      ),
    }));
  }

  function animateInfoVisibility(info: CardInfoElements, shouldShow: boolean) {
    options.gsap.to(info.clients, {
      autoAlpha: shouldShow ? 1 : 0,
      y: shouldShow ? 0 : -8,
      duration: shouldShow ? 0.3 : 0.18,
      stagger: shouldShow ? 0.08 : 0,
      ease: shouldShow ? "power2.out" : "power1.out",
      overwrite: true,
    });

    options.gsap.to(info.meta, {
      autoAlpha: shouldShow ? 1 : 0,
      y: shouldShow ? 0 : -8,
      duration: shouldShow ? 0.3 : 0.18,
      ease: shouldShow ? "power2.out" : "power1.out",
      overwrite: true,
    });
  }

  function hideAllInfo() {
    const allInfo = getInfoByCard();
    options.gsap.set(
      allInfo.flatMap((info) => info.clients),
      { autoAlpha: 0, y: -8 },
    );
    options.gsap.set(
      allInfo.flatMap((info) => info.meta),
      { autoAlpha: 0, y: -8 },
    );
  }

  function syncVisibleInfo() {
    if (isScrollingCards.value) {
      const allInfo = getInfoByCard();

      options.gsap.to(
        allInfo.flatMap((info) => info.clients),
        {
          autoAlpha: 0,
          y: -8,
          duration: 0.12,
          overwrite: true,
        },
      );
      options.gsap.to(
        allInfo.flatMap((info) => info.meta),
        {
          autoAlpha: 0,
          y: -8,
          duration: 0.12,
          overwrite: true,
        },
      );
      return;
    }

    const visibleIndexes = new Set<number>();
    if (hoveredCardIndex.value !== null) {
      visibleIndexes.add(hoveredCardIndex.value);
    } else {
      visibleIndexes.add(snappedCardIndex.value);
    }

    getInfoByCard().forEach((info, index) => {
      animateInfoVisibility(info, visibleIndexes.has(index));
    });
  }

  function setHoveredIndex(index: number | null) {
    hoveredCardIndex.value = index;
    syncVisibleInfo();
  }

  function setSnappedIndex(index: number) {
    snappedCardIndex.value = index;
    syncVisibleInfo();
  }

  function setScrolling(isScrolling: boolean) {
    isScrollingCards.value = isScrolling;
    syncVisibleInfo();
  }

  return {
    hideAllInfo,
    setHoveredIndex,
    setScrolling,
    setSnappedIndex,
    syncVisibleInfo,
  };
}
