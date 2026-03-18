import { onMounted, ref, type Ref, watch } from "vue";

type UseWorkCardInfoAnimationOptions = {
  cardsVersion?: Ref<number>;
  getCards: () => HTMLElement[];
  getMetaGroups: () => HTMLElement[];
  gsap: typeof gsap;
  metaVersion?: Ref<number>;
};

type CardInfoElements = {
  clients: HTMLElement[];
  meta: HTMLElement[];
};

export function useCardInfo(options: UseWorkCardInfoAnimationOptions) {
  const hoveredCardIndex = ref<number | null>(null);
  const isScrollingCards = ref(false);
  const snappedCardIndex = ref(0);
  let infoByCardCache: CardInfoElements[] | null = null;

  function buildInfoByCardCache(): CardInfoElements[] {
    const cards = options.getCards();
    const metaGroups = options.getMetaGroups();

    return cards.map((card, index) => ({
      clients: Array.from(card.querySelectorAll<HTMLElement>("[data-client-chip]")),
      meta: Array.from(
        (metaGroups[index] ?? card).querySelectorAll<HTMLElement>("[data-work-meta]"),
      ),
    }));
  }

  function refreshInfoByCardCache() {
    infoByCardCache = buildInfoByCardCache();
  }

  function getInfoByCard(): CardInfoElements[] {
    if (!infoByCardCache) {
      refreshInfoByCardCache();
    }

    return infoByCardCache ?? [];
  }

  function animateInfoVisibility(info: CardInfoElements, shouldShow: boolean) {
    if (info.clients.length > 0) {
      options.gsap.to(info.clients, {
        autoAlpha: shouldShow ? 1 : 0,
        y: shouldShow ? 0 : -8,
        duration: shouldShow ? 0.3 : 0.18,
        stagger: shouldShow ? 0.08 : 0,
        ease: shouldShow ? "power2.out" : "power1.out",
        overwrite: true,
      });
    }

    if (info.meta.length > 0) {
      options.gsap.to(info.meta, {
        autoAlpha: shouldShow ? 1 : 0,
        y: shouldShow ? 0 : -8,
        duration: shouldShow ? 0.3 : 0.18,
        ease: shouldShow ? "power2.out" : "power1.out",
        overwrite: true,
      });
    }
  }

  function hideAllInfo() {
    const allInfo = getInfoByCard();
    const allClients = allInfo.flatMap((info) => info.clients);
    const allMeta = allInfo.flatMap((info) => info.meta);
    if (allClients.length > 0) {
      options.gsap.set(allClients, { autoAlpha: 0, y: -8 });
    }
    if (allMeta.length > 0) {
      options.gsap.set(allMeta, { autoAlpha: 0, y: -8 });
    }
  }

  function syncVisibleInfo() {
    if (isScrollingCards.value) {
      const allInfo = getInfoByCard();
      const allClients = allInfo.flatMap((info) => info.clients);
      const allMeta = allInfo.flatMap((info) => info.meta);

      if (allClients.length > 0) {
        options.gsap.to(allClients, {
          autoAlpha: 0,
          y: -8,
          duration: 0.12,
          overwrite: true,
        });
      }
      if (allMeta.length > 0) {
        options.gsap.to(allMeta, {
          autoAlpha: 0,
          y: -8,
          duration: 0.12,
          overwrite: true,
        });
      }
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

  onMounted(() => {
    refreshInfoByCardCache();
  });

  if (options.cardsVersion || options.metaVersion) {
    watch(
      [() => options.cardsVersion?.value, () => options.metaVersion?.value],
      () => {
        refreshInfoByCardCache();
      },
      { flush: "post" },
    );
  }

  return {
    hideAllInfo,
    setHoveredIndex,
    setScrolling,
    setSnappedIndex,
    syncVisibleInfo,
  };
}
