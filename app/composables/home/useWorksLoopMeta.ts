import type { Ref } from "vue";

type UseWorksLoopMetaOptions = {
  hoveredCardIndex: Ref<number | null>;
  isCardsScrolling: Ref<boolean>;
  loopCount: number;
  metaRowHeightPx: Ref<number>;
  metaTrackRef: Ref<HTMLElement | null>;
  snappedCardIndex: Ref<number>;
};

export function useWorksLoopMeta(options: UseWorksLoopMetaOptions) {
  let scrollVisualMetaIndex = 0;
  let metaVisualIndex = options.loopCount;

  function applyMetaVisualIndex(nextIndex: number, force = false) {
    if (!force && nextIndex === metaVisualIndex) return;

    metaVisualIndex = nextIndex;
    if (!options.metaTrackRef.value) return;

    options.metaTrackRef.value.style.transform = `translate3d(0, -${metaVisualIndex * options.metaRowHeightPx.value}px, 0)`;
  }

  function toContinuousMetaIndex(wrappedIndex: number) {
    const count = options.loopCount;
    if (count <= 0) return 0;

    const cycle = Math.round((metaVisualIndex - wrappedIndex) / count);
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
    const firstMetaGroup =
      options.metaTrackRef.value?.querySelector<HTMLElement>("[data-work-meta-group]");
    if (!firstMetaGroup) return;

    const nextHeight = Math.round(firstMetaGroup.getBoundingClientRect().height);
    if (nextHeight <= 0) return;

    options.metaRowHeightPx.value = nextHeight;
    applyMetaVisualIndex(metaVisualIndex, true);
  }

  function applyInitialPosition() {
    applyMetaVisualIndex(metaVisualIndex, true);
  }

  function onCardEnter(index: number) {
    setMetaVisualFromWrappedIndex(index);
  }

  function onCardLeave() {
    setMetaVisualFromWrappedIndex(
      options.isCardsScrolling.value ? scrollVisualMetaIndex : options.snappedCardIndex.value,
    );
  }

  function onSnappedIndexChange(index: number) {
    if (!options.isCardsScrolling.value && options.hoveredCardIndex.value === null) {
      setMetaVisualFromWrappedIndex(index);
    }
  }

  function onScrollActivityChange(isScrolling: boolean) {
    if (!isScrolling && options.hoveredCardIndex.value === null) {
      setMetaVisualFromWrappedIndex(options.snappedCardIndex.value);
    }
  }

  function onVisualIndexChange(index: number) {
    scrollVisualMetaIndex = index;
    if (options.hoveredCardIndex.value === null) {
      setMetaVisualFromWrappedIndex(index);
    }
  }

  return {
    applyInitialPosition,
    onCardEnter,
    onCardLeave,
    onScrollActivityChange,
    onSnappedIndexChange,
    onVisualIndexChange,
    syncMetaRowHeight,
  };
}
