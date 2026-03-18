const COVER_TARGET_Y = -200;
const COVER_DURATION = 0.8;
const COVER_EASE = "power2.in";
const COVER_TARGET_BLUR = 6;

const REVEAL_START_Y = 100;
const REVEAL_DURATION = 0.8;
const REVEAL_EASE = "power2.out";
const REVEAL_START_AT = 0.4;

type NullableElement = HTMLElement | null | undefined;

type AddCoverMotionOptions = {
  withBlur?: boolean;
};

type AddRevealMotionOptions = {
  shouldAnimate: boolean;
  withBlur?: boolean;
};

export function usePageLayerTransition() {
  const { $gsap } = useNuxtApp();

  function kill(pageEl: NullableElement) {
    if (!pageEl) return;
    $gsap.killTweensOf(pageEl);
  }

  function clear(pageEl: NullableElement, options?: { withBlur?: boolean }) {
    if (!pageEl) return;
    $gsap.set(pageEl, { clearProps: options?.withBlur ? "transform,filter" : "transform" });
  }

  function addCoverMotion(
    timeline: gsap.core.Timeline,
    pageEl: NullableElement,
    options?: AddCoverMotionOptions,
  ) {
    if (!pageEl) return;

    kill(pageEl);
    const withBlur = options?.withBlur ?? false;
    if (withBlur) {
      $gsap.set(pageEl, { filter: "blur(0px)" });
    }

    timeline.to(
      pageEl,
      {
        y: COVER_TARGET_Y,
        ...(withBlur ? { filter: `blur(${COVER_TARGET_BLUR}px)` } : {}),
        duration: COVER_DURATION,
        ease: COVER_EASE,
      },
      0,
    );
  }

  function addRevealMotion(
    timeline: gsap.core.Timeline,
    pageEl: NullableElement,
    options: AddRevealMotionOptions,
  ) {
    if (!pageEl) return;

    kill(pageEl);
    const withBlur = options.withBlur ?? false;

    if (!options.shouldAnimate) {
      clear(pageEl, { withBlur });
      return;
    }

    $gsap.set(pageEl, {
      y: REVEAL_START_Y,
      ...(withBlur ? { filter: `blur(${COVER_TARGET_BLUR}px)` } : {}),
    });

    timeline.to(
      pageEl,
      {
        y: 0,
        ...(withBlur ? { filter: "blur(0px)" } : {}),
        duration: REVEAL_DURATION,
        ease: REVEAL_EASE,
        delay: 0.1,
        clearProps: withBlur ? "transform,filter" : "transform",
      },
      REVEAL_START_AT,
    );
  }

  return {
    addCoverMotion,
    addRevealMotion,
    clear,
    kill,
  };
}
