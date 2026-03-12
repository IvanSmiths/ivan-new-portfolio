import { onScopeDispose, type Ref } from "vue";

type UseLogoHoverOptions = {
  onHover?: () => void;
};

function getLetterGroups(lettersRef: Ref<SVGGElement | null>) {
  return Array.from(lettersRef.value?.children ?? [])
    .filter((node): node is SVGGElement => node instanceof SVGGElement)
    .reverse();
}

function getLetterPath(group: SVGGElement) {
  const path = group.querySelector<SVGPathElement>("path");
  return path instanceof SVGPathElement ? path : null;
}

export function useLogoHover(
  lettersRef: Ref<SVGGElement | null>,
  options: UseLogoHoverOptions = {},
) {
  const { $gsap } = useNuxtApp();

  let cleanups: (() => void)[] = [];

  function teardown() {
    cleanups.forEach((cleanup) => cleanup());
    cleanups = [];
  }

  function setupGroupHover(group: SVGGElement, path: SVGPathElement) {
    let isPointerInside = false;
    let hasPlayedSinceLeave = false;
    let isAnimating = false;
    let pulseAnimation: gsap.core.Timeline | null = null;
    let resetTimer: number | null = null;
    const resetDelayMs = 10;

    $gsap.set(group, { transformOrigin: "center center" });

    function clearResetTimer() {
      if (resetTimer === null) return;
      window.clearTimeout(resetTimer);
      resetTimer = null;
    }

    function scheduleReset() {
      clearResetTimer();
      resetTimer = window.setTimeout(() => {
        if (!isPointerInside && !isAnimating) {
          hasPlayedSinceLeave = false;
        }
        resetTimer = null;
      }, resetDelayMs);
    }

    function playPulse() {
      const idleFill = getComputedStyle(path).fill;

      pulseAnimation?.kill();
      pulseAnimation = $gsap
        .timeline({
          onStart: () => {
            isAnimating = true;
          },
          onComplete: () => {
            path.style.removeProperty("fill");
            isAnimating = false;
            pulseAnimation = null;

            if (!isPointerInside) {
              scheduleReset();
            }
          },
        })
        .to(
          group,
          {
            scale: 0.95,
            transformOrigin: "center center",
            duration: 0.3,
            ease: "power2.out",
          },
          0,
        )
        .to(
          path,
          {
            fill: "#ef4444",
            duration: 0.3,
            ease: "power2.out",
          },
          0,
        )
        .to(
          group,
          {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
            clearProps: "transform",
          },
          0.3,
        )
        .to(
          path,
          {
            fill: idleFill,
            duration: 0.3,
            ease: "power2.out",
          },
          0.3,
        );
    }

    const onEnter = () => {
      isPointerInside = true;
      clearResetTimer();
      if (hasPlayedSinceLeave || isAnimating) return;
      hasPlayedSinceLeave = true;
      options.onHover?.();
      playPulse();
    };

    const onLeave = () => {
      isPointerInside = false;
      if (!isAnimating) {
        scheduleReset();
      }
    };

    group.addEventListener("pointerenter", onEnter);
    group.addEventListener("pointerleave", onLeave);

    cleanups.push(() => {
      group.removeEventListener("pointerenter", onEnter);
      group.removeEventListener("pointerleave", onLeave);
      $gsap.killTweensOf(group);
      $gsap.killTweensOf(path);
      clearResetTimer();
      pulseAnimation?.kill();
      pulseAnimation = null;
    });
  }

  function setup() {
    teardown();

    const groups = getLetterGroups(lettersRef);
    if (!groups.length) return;

    groups.forEach((group) => {
      const path = getLetterPath(group);
      if (!path) return;
      setupGroupHover(group, path);
    });
  }

  onScopeDispose(() => {
    teardown();
  });

  return {
    setup,
  };
}
