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

      const hoverAnimation = $gsap
        .timeline({ paused: true })
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
        );

      const onEnter = () => hoverAnimation.play();
      const onLeave = () => hoverAnimation.reverse();

      group.addEventListener("mouseenter", onEnter);
      group.addEventListener("mouseleave", onLeave);

      cleanups.push(() => {
        group.removeEventListener("mouseenter", onEnter);
        group.removeEventListener("mouseleave", onLeave);
        hoverAnimation.kill();
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
