import { onScopeDispose, type Ref } from "vue";

function getLetterGroups(lettersRef: Ref<SVGGElement | null>) {
  return Array.from(lettersRef.value?.children ?? [])
    .filter((node): node is SVGGElement => node instanceof SVGGElement)
    .reverse();
}

export function useHomeLogoHoverAnimation(lettersRef: Ref<SVGGElement | null>) {
  const { $gsap } = useNuxtApp();

  let cleanups: (() => void)[] = [];

  function teardown() {
    cleanups.forEach((cleanup) => cleanup());
    cleanups = [];
  }

  function setup() {
    teardown();

    const groups = getLetterGroups(lettersRef);
    if (!groups.length) return;

    groups.forEach((group) => {
      const path = group.querySelector("path");
      if (!path) return;

      let isPointerInside = false;
      let hasPlayedSinceLeave = false;
      let isAnimating = false;
      let pulseAnimation: gsap.core.Timeline | null = null;
      let resetTimer: number | null = null;
      const resetDelayMs = 180;

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
              duration: 0.22,
              ease: "power2.out",
            },
            0,
          )
          .to(
            group,
            {
              scale: 1,
              duration: 0.22,
              ease: "power2.out",
              clearProps: "transform",
            },
            0.22,
          )
          .to(
            path,
            {
              fill: idleFill,
              duration: 0.22,
              ease: "power2.out",
            },
            0.22,
          );
      }

      const onEnter = () => {
        isPointerInside = true;
        clearResetTimer();
        if (hasPlayedSinceLeave || isAnimating) return;
        hasPlayedSinceLeave = true;
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
    });
  }

  onScopeDispose(() => {
    teardown();
  });

  return {
    setup,
  };
}
