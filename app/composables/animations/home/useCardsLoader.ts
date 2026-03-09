import { nextTick, onScopeDispose, ref, type Ref } from "vue";
import { useLoaderSession } from "~/composables/sessions/useLoaderSession";

type LoaderPhase = "idle" | "loading" | "animating" | "done";

type UseHomeCardsLoaderAnimationOptions = {
  cardsRef: Ref<HTMLElement | null>;
  loaderCardsRef: Ref<HTMLElement | null>;
};

export function useCardsLoader(options: UseHomeCardsLoaderAnimationOptions) {
  const { $gsap } = useNuxtApp();
  const { hasSeenLoader, markLoaderSeen, notifyLoaderDone } = useLoaderSession();

  const shouldRunLoader = ref(false);
  const shouldHideLiveCards = ref(false);
  const loaderPhase = ref<LoaderPhase>("idle");

  let loaderTimeline: gsap.core.Timeline | null = null;
  let restoreScrollLock: (() => void) | null = null;

  function getCardsForTransition() {
    return Array.from(options.cardsRef.value?.querySelectorAll<HTMLElement>("li") ?? []);
  }

  function getTargetElementsForTransition() {
    return getCardsForTransition().map(
      (card) => card.querySelector<HTMLElement>("[data-work-card-shell]") ?? card,
    );
  }

  function getImagesForTransition() {
    return Array.from(options.cardsRef.value?.querySelectorAll<HTMLImageElement>("img") ?? []);
  }

  function getLoaderShells() {
    return Array.from(
      options.loaderCardsRef.value?.querySelectorAll<HTMLElement>("[data-loader-shell]") ?? [],
    );
  }

  function getLoaderCards() {
    return Array.from(
      options.loaderCardsRef.value?.querySelectorAll<HTMLElement>("[data-loader-card]") ?? [],
    );
  }

  function getLoaderImages() {
    return Array.from(
      options.loaderCardsRef.value?.querySelectorAll<HTMLImageElement>("[data-loader-image]") ?? [],
    );
  }

  function lockScroll() {
    if (!import.meta.client || restoreScrollLock) return;

    const htmlOverflow = document.documentElement.style.overflow;
    const bodyOverflow = document.body.style.overflow;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    restoreScrollLock = () => {
      document.documentElement.style.overflow = htmlOverflow;
      document.body.style.overflow = bodyOverflow;
      restoreScrollLock = null;
    };
  }

  function unlockScroll() {
    restoreScrollLock?.();
  }

  function waitForImage(image: HTMLImageElement) {
    if (image.complete) {
      return Promise.resolve();
    }

    return new Promise<void>((resolve) => {
      let settled = false;

      const finish = () => {
        if (settled) return;
        settled = true;
        resolve();
      };

      image.addEventListener("load", finish, { once: true });
      image.addEventListener("error", finish, { once: true });

      if (typeof image.decode === "function") {
        void image
          .decode()
          .then(finish)
          .catch(() => {});
      }
    });
  }

  function waitForImages(images: HTMLImageElement[]) {
    return Promise.all(images.map((image) => waitForImage(image)));
  }

  function toRelativeRect(rect: DOMRect, containerRect: DOMRect) {
    return {
      left: rect.left - containerRect.left,
      top: rect.top - containerRect.top,
      width: rect.width,
      height: rect.height,
    };
  }

  function getLoaderStartRects(
    cardsCount: number,
    referenceRect: DOMRect | undefined,
    containerRect: DOMRect,
  ) {
    const firstRect = referenceRect;
    const targetWidth = firstRect?.width ?? 224;
    const targetHeight = firstRect?.height ?? 384;
    const gap = Math.max(4, Math.round(window.innerHeight * 0.006));
    const maxStackHeight = window.innerHeight * 0.7;
    const maxCardHeight =
      (maxStackHeight - gap * Math.max(0, cardsCount - 1)) / cardsCount;
    const startHeight = Math.max(18, Math.min(targetHeight * 0.1, maxCardHeight));
    const startWidth = startHeight * (targetWidth / targetHeight);
    const totalHeight = startHeight * cardsCount + gap * Math.max(0, cardsCount - 1);
    const startTop = (window.innerHeight - totalHeight) / 2;
    const startLeft = (window.innerWidth - startWidth) / 2;

    return Array.from({ length: cardsCount }, (_, index) => ({
      x: startLeft - containerRect.left,
      y: startTop - containerRect.top + index * (startHeight + gap),
      width: startWidth,
      height: startHeight,
    }));
  }

  function getLoaderTargetIndices(
    targetViewportRects: DOMRect[],
    loaderCount: number,
  ): number[] {
    if (loaderCount <= 0 || targetViewportRects.length <= 0) return [];

    if (loaderCount >= targetViewportRects.length) {
      return Array.from({ length: targetViewportRects.length }, (_, index) => index);
    }

    const viewportCenter = window.innerWidth / 2;
    const centered = targetViewportRects
      .map((rect, index) => ({
        distance: Math.abs(rect.left + rect.width / 2 - viewportCenter),
        index,
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, loaderCount)
      .sort((a, b) => a.index - b.index);

    return centered.map(({ index }) => index);
  }

  function createAlternatingSpreadData(
    cardsCount: number,
    each: number,
  ): {
    stagger: (index: number, _target: unknown, list: unknown[]) => number;
    zIndices: number[];
  } {
    const delays = new Array(cardsCount).fill(0);
    const zIndices = new Array(cardsCount).fill(1);

    const visitOrder: number[] = [];
    if (cardsCount > 0) {
      visitOrder.push(0);

      let left = 1;
      let right = cardsCount - 1;

      while (left <= right) {
        visitOrder.push(right);
        if (left < right) {
          visitOrder.push(left);
        }
        left += 1;
        right -= 1;
      }
    }

    visitOrder.forEach((index, order) => {
      const group = order === 0 ? 0 : Math.ceil(order / 2);
      delays[index] = group * each;
      zIndices[index] = cardsCount - order;
    });

    return {
      stagger: (index) => delays[index] ?? 0,
      zIndices,
    };
  }

  function resetLoaderState() {
    loaderTimeline?.kill();
    loaderTimeline = null;
    shouldHideLiveCards.value = false;
    loaderPhase.value = "done";
    shouldRunLoader.value = false;
    unlockScroll();
  }

  function completeLoaderRun() {
    markLoaderSeen();
    notifyLoaderDone();
    resetLoaderState();
  }

  function cleanup() {
    loaderTimeline?.kill();
    loaderTimeline = null;
    unlockScroll();
  }

  function prepare() {
    shouldRunLoader.value = !hasSeenLoader();
    shouldHideLiveCards.value = shouldRunLoader.value;
    loaderPhase.value = shouldRunLoader.value ? "loading" : "done";

    if (shouldRunLoader.value) {
      lockScroll();
    }
  }

  async function play() {
    const targetElements = getTargetElementsForTransition();
    if (!shouldRunLoader.value || !targetElements.length) {
      completeLoaderRun();
      return;
    }

    loaderPhase.value = "loading";
    await waitForImages(getImagesForTransition());

    if (!shouldRunLoader.value) return;

    loaderPhase.value = "animating";
    await nextTick();
    await waitForImages(getLoaderImages());

    const loaderShells = getLoaderShells();
    const loaderCards = getLoaderCards();
    const loaderImages = getLoaderImages();

    const loaderCount = Math.min(
      loaderShells.length,
      loaderCards.length,
      loaderImages.length,
      targetElements.length,
    );
    if (!loaderCount) {
      completeLoaderRun();
      return;
    }

    const activeLoaderShells = loaderShells.slice(0, loaderCount);
    const activeLoaderCards = loaderCards.slice(0, loaderCount);
    const activeLoaderImages = loaderImages.slice(0, loaderCount);

    const loaderContainerRect = options.loaderCardsRef.value?.getBoundingClientRect();
    if (!loaderContainerRect) {
      completeLoaderRun();
      return;
    }

    const targetViewportRects = targetElements.map((element) => element.getBoundingClientRect());
    const targetIndices = getLoaderTargetIndices(targetViewportRects, loaderCount);
    if (targetIndices.length !== loaderCount) {
      completeLoaderRun();
      return;
    }

    const selectedTargetViewportRects = targetIndices
      .map((targetIndex) => targetViewportRects[targetIndex])
      .filter((rect): rect is DOMRect => Boolean(rect));
    if (selectedTargetViewportRects.length !== loaderCount) {
      completeLoaderRun();
      return;
    }

    const targetRects = selectedTargetViewportRects.map((rect) =>
      toRelativeRect(rect, loaderContainerRect),
    );
    const startRects = getLoaderStartRects(
      loaderCount,
      selectedTargetViewportRects[0],
      loaderContainerRect,
    );
    const { stagger: spreadAlternating, zIndices } = createAlternatingSpreadData(loaderCount, 0.03);

    activeLoaderShells.forEach((shell, index) => {
      const startRect = startRects[index];
      if (!startRect) return;

      $gsap.set(shell, {
        x: startRect.x,
        y: startRect.y,
        width: startRect.width,
        height: startRect.height,
        autoAlpha: 1,
        zIndex: zIndices[index] ?? 1,
        willChange: "transform,width,height,opacity",
      });
    });

    $gsap.set(activeLoaderCards, {
      yPercent: 110,
      autoAlpha: 0,
      willChange: "transform,opacity",
    });
    $gsap.set(activeLoaderImages, { scale: 1.14, willChange: "transform" });

    const completed = await new Promise<boolean>((resolve) => {
      loaderTimeline = $gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => resolve(true),
        onInterrupt: () => resolve(false),
      });

      loaderTimeline
        .to(activeLoaderCards, {
          yPercent: 0,
          autoAlpha: 1,
          duration: 1,
          stagger: spreadAlternating,
        })
        .to(activeLoaderShells, {
          x: (index) => targetRects[index]?.left ?? 0,
          y: (index) => targetRects[index]?.top ?? 0,
          width: (index) => targetRects[index]?.width ?? 0,
          height: (index) => targetRects[index]?.height ?? 0,
          duration: 2,
          ease: "expo.inOut",
          stagger: spreadAlternating,
        })
        .to(
          activeLoaderImages,
          {
            scale: 1,
            duration: 1,
            ease: "power2.out",
            stagger: spreadAlternating,
          },
          2.2,
        )
        .add(() => {
          shouldHideLiveCards.value = false;
        }, 1.08);
    });

    if (!completed) {
      resetLoaderState();
      return;
    }

    completeLoaderRun();
  }

  onScopeDispose(() => {
    cleanup();
  });

  return {
    cleanup,
    loaderPhase,
    play,
    prepare,
    shouldHideLiveCards,
    shouldRunLoader,
  };
}
