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

  function getLoaderStartRects(targetCards: HTMLElement[], containerRect: DOMRect) {
    const firstRect = targetCards[0]?.getBoundingClientRect();
    const targetWidth = firstRect?.width ?? 224;
    const targetHeight = firstRect?.height ?? 384;
    const gap = Math.max(4, Math.round(window.innerHeight * 0.006));
    const maxStackHeight = window.innerHeight * 0.7;
    const maxCardHeight =
      (maxStackHeight - gap * Math.max(0, targetCards.length - 1)) / targetCards.length;
    const startHeight = Math.max(18, Math.min(targetHeight * 0.1, maxCardHeight));
    const startWidth = startHeight * (targetWidth / targetHeight);
    const totalHeight =
      startHeight * targetCards.length + gap * Math.max(0, targetCards.length - 1);
    const startTop = (window.innerHeight - totalHeight) / 2;
    const startLeft = (window.innerWidth - startWidth) / 2;

    return targetCards.map((_, index) => ({
      x: startLeft - containerRect.left,
      y: startTop - containerRect.top + index * (startHeight + gap),
      width: startWidth,
      height: startHeight,
    }));
  }

  function createCenterSpreadData(
    rects: DOMRect[],
    each: number,
  ): {
    stagger: (index: number, _target: unknown, list: unknown[]) => number;
    zIndices: number[];
  } {
    const viewportCenter = window.innerWidth / 2;
    const delays = new Array(rects.length).fill(0);
    const zIndices = new Array(rects.length).fill(1);
    const ordered = rects
      .map((rect, index) => ({
        index,
        distance: Math.abs(rect.left + rect.width / 2 - viewportCenter),
        x: rect.left + rect.width / 2,
      }))
      .sort((a, b) => {
        if (a.distance !== b.distance) return a.distance - b.distance;
        return a.x - b.x;
      });

    ordered.forEach((item, order) => {
      delays[item.index] = order * each;
      zIndices[item.index] = rects.length - order;
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
    const targetCards = getCardsForTransition();
    if (!shouldRunLoader.value || !targetCards.length) {
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

    if (
      !loaderShells.length ||
      loaderShells.length !== targetCards.length ||
      loaderCards.length !== targetCards.length
    ) {
      completeLoaderRun();
      return;
    }

    const loaderContainerRect = options.loaderCardsRef.value?.getBoundingClientRect();
    if (!loaderContainerRect) {
      completeLoaderRun();
      return;
    }

    const startRects = getLoaderStartRects(targetCards, loaderContainerRect);
    const targetViewportRects = targetCards.map((card) => card.getBoundingClientRect());
    const targetRects = targetViewportRects.map((rect) =>
      toRelativeRect(rect, loaderContainerRect),
    );
    const { stagger: spreadFromCenter, zIndices: centerZIndices } = createCenterSpreadData(
      targetViewportRects,
      0.03,
    );

    loaderShells.forEach((shell, index) => {
      const startRect = startRects[index];
      if (!startRect) return;

      $gsap.set(shell, {
        x: startRect.x,
        y: startRect.y,
        width: startRect.width,
        height: startRect.height,
        autoAlpha: 1,
        zIndex: centerZIndices[index] ?? 1,
        willChange: "transform,width,height,opacity",
      });
    });

    $gsap.set(loaderCards, {
      yPercent: 110,
      autoAlpha: 0,
      willChange: "transform,opacity",
    });
    $gsap.set(loaderImages, { scale: 1.14, willChange: "transform" });

    const completed = await new Promise<boolean>((resolve) => {
      loaderTimeline = $gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => resolve(true),
        onInterrupt: () => resolve(false),
      });

      loaderTimeline
        .to(loaderCards, {
          yPercent: 0,
          autoAlpha: 1,
          duration: 1,
          stagger: 0.03,
        })
        .to(loaderShells, {
          x: (index) => targetRects[index]?.left ?? 0,
          y: (index) => targetRects[index]?.top ?? 0,
          width: (index) => targetRects[index]?.width ?? 0,
          height: (index) => targetRects[index]?.height ?? 0,
          duration: 2,
          ease: "expo.inOut",
          stagger: spreadFromCenter,
        })
        .to(
          loaderImages,
          {
            scale: 1,
            duration: 1,
            ease: "power2.out",
            stagger: spreadFromCenter,
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
