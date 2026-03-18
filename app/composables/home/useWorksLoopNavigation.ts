import { nextTick, type Ref } from "vue";

type ExpandOriginSnapshot = {
  borderRadius: string;
  containerRect: Pick<DOMRect, "height" | "left" | "top" | "width">;
  imageEl: HTMLImageElement | null;
  imageScale: number;
  imageX: number;
};

type ExpandTransition = {
  onImageClick: (
    event: MouseEvent,
    index: number,
    originSnapshot?: ExpandOriginSnapshot,
  ) => Promise<void>;
};

type UseWorksLoopNavigationOptions = {
  clickedCardIndex: Ref<number | null>;
  expandTransition: ExpandTransition;
  gsap: typeof gsap;
  isLocked: Ref<boolean>;
  waitForActiveVideoFadeOut: (index: number) => Promise<void>;
};

export function useWorksLoopNavigation(options: UseWorksLoopNavigationOptions) {
  function createExpandOriginSnapshot(event: MouseEvent) {
    const clickedImageEl =
      event.currentTarget instanceof HTMLImageElement ? event.currentTarget : null;
    const clickedContainerEl = (clickedImageEl?.parentElement as HTMLElement | null) ?? null;
    const clickedContainerRect = clickedContainerEl?.getBoundingClientRect();
    const clickedContainerBorderRadius = clickedContainerEl
      ? window.getComputedStyle(clickedContainerEl).borderRadius
      : "";

    if (!clickedImageEl || !clickedContainerRect) return undefined;

    return {
      borderRadius: clickedContainerBorderRadius,
      containerRect: {
        left: clickedContainerRect.left,
        top: clickedContainerRect.top,
        width: clickedContainerRect.width,
        height: clickedContainerRect.height,
      },
      imageEl: clickedImageEl,
      imageScale: Number(options.gsap.getProperty(clickedImageEl, "scale")) || 1,
      imageX: Number(options.gsap.getProperty(clickedImageEl, "x")) || 0,
    } satisfies ExpandOriginSnapshot;
  }

  async function onCardClick(event: MouseEvent, index: number) {
    if (options.isLocked.value) return;

    const expandOriginSnapshot = createExpandOriginSnapshot(event);
    options.clickedCardIndex.value = index;
    await nextTick();
    await options.waitForActiveVideoFadeOut(index);
    await options.expandTransition.onImageClick(event, index, expandOriginSnapshot);
  }

  return { onCardClick };
}
