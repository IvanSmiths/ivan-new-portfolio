const COVER_TARGET_Y = -200;
const COVER_DURATION = 0.7;
const COVER_EASE = "power2.in";

const REVEAL_START_Y = 100;
const REVEAL_DURATION = 0.7;
const REVEAL_EASE = "power2.out";
const REVEAL_START_AT = 0.18;

type NullableElement = HTMLElement | null | undefined;

type AddRevealMotionOptions = {
  shouldAnimate: boolean;
};

export function usePageLayerTransition() {
  const { $gsap } = useNuxtApp();

  function kill(pageEl: NullableElement) {
    if (!pageEl) return;
    $gsap.killTweensOf(pageEl);
  }

  function clear(pageEl: NullableElement) {
    if (!pageEl) return;
    $gsap.set(pageEl, { clearProps: "transform" });
  }

  function addCoverMotion(timeline: gsap.core.Timeline, pageEl: NullableElement) {
    if (!pageEl) return;

    kill(pageEl);
    timeline.to(
      pageEl,
      {
        y: COVER_TARGET_Y,
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

    if (!options.shouldAnimate) {
      clear(pageEl);
      return;
    }

    $gsap.set(pageEl, { y: REVEAL_START_Y });
    timeline.to(
      pageEl,
      {
        y: 0,
        duration: REVEAL_DURATION,
        ease: REVEAL_EASE,
        delay: 0.1,
        clearProps: "transform",
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
