import { ref } from "vue";
import type { WorkCard } from "~/domain/works/types";

type WorksLoopItem = {
  key: string;
  work: WorkCard;
};

const CARD_GAP_PX = 20;
const VIDEO_FADE_OUT_DURATION_MS = 320;
const META_ROW_FALLBACK_HEIGHT_PX = 0;
const MOBILE_SCROLL_DISTANCE_PX = 4000;
const DESKTOP_SCROLL_DISTANCE_PX = 3000;
const MINIMUM_CARDS = 20;
const LOADER_REPEATS = 3;
const META_TRACK_REPEAT_MULTIPLIER = 3;

function createWorksLoopItems(works: readonly WorkCard[], cycles: number): WorksLoopItem[] {
  return Array.from({ length: works.length * cycles }, (_, index) => {
    const work = works[index % works.length];
    if (!work) {
      throw new Error(`Work not found at index ${index % works.length}`);
    }

    return {
      key: `${work.slug}-${index}`,
      work,
    };
  });
}

export function useWorksLoopState(works: readonly WorkCard[]) {
  const repeats = Math.max(3, Math.ceil(MINIMUM_CARDS / works.length));

  const loopWorks = createWorksLoopItems(works, repeats);
  const loaderLoopWorks = createWorksLoopItems(works, LOADER_REPEATS);
  const loaderWorks = loopWorks.map(({ work }) => work);
  const metaLoopItems = Array.from(
    { length: loopWorks.length * META_TRACK_REPEAT_MULTIPLIER },
    (_, index) => {
      const source = loopWorks[index % loopWorks.length];
      if (!source) {
        throw new Error(`Meta source not found at index ${index % loopWorks.length}`);
      }

      return {
        key: `${source.key}-meta-track-${index}`,
        work: source.work,
      };
    },
  );

  const scrollDistancePx =
    import.meta.client && window.matchMedia("(max-width: 767px)").matches
      ? MOBILE_SCROLL_DISTANCE_PX
      : DESKTOP_SCROLL_DISTANCE_PX;

  const isLoopReady = ref(false);
  const expandLock = ref(false);
  const hoveredCardIndex = ref<number | null>(null);
  const snappedCardIndex = ref(0);
  const clickedCardIndex = ref<number | null>(null);
  const isCardsScrolling = ref(false);
  const metaRowHeightPx = ref(META_ROW_FALLBACK_HEIGHT_PX);

  return {
    cardGapPx: CARD_GAP_PX,
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
    videoFadeOutDurationMs: VIDEO_FADE_OUT_DURATION_MS,
  };
}
