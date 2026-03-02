import { onScopeDispose, type Ref } from "vue";
import { useWorksLoaderSession } from "~/composables/animations/work/useWorksLoaderSession";

function getLetterGroups(lettersRef: Ref<SVGGElement | null>) {
  return Array.from(lettersRef.value?.children ?? [])
    .filter((node): node is SVGGElement => node instanceof SVGGElement)
    .reverse();
}

export function useHomeLogoRevealAnimation(lettersRef: Ref<SVGGElement | null>) {
  const { $gsap } = useNuxtApp();
  const { hasSeenLoader, onLoaderDone } = useWorksLoaderSession();

  let ctx: gsap.Context | null = null;
  let stopListening: (() => void) | null = null;

  function cleanup() {
    stopListening?.();
    ctx?.revert();
    stopListening = null;
    ctx = null;
  }

  function setFinalState(groups: SVGGElement[]) {
    $gsap.set(groups, { y: 0, autoAlpha: 1, clearProps: "transform,opacity,visibility" });
  }

  function runAnimation() {
    const root = lettersRef.value;
    const groups = getLetterGroups(lettersRef);

    if (!root || !groups.length) return;

    ctx?.revert();
    ctx = $gsap.context(() => {
      $gsap.set(groups, { y: 100, autoAlpha: 0 });
      $gsap.to(groups, {
        y: 0,
        autoAlpha: 1,
        duration: 2,
        stagger: 0.1,
        ease: "expo.out",
        clearProps: "transform,opacity,visibility",
      });
    }, root);
  }

  function init() {
    cleanup();

    const groups = getLetterGroups(lettersRef);
    if (!groups.length) return;

    if (hasSeenLoader()) {
      setFinalState(groups);
      return;
    }

    $gsap.set(groups, { y: 100, autoAlpha: 0 });
    stopListening = onLoaderDone(() => runAnimation());
  }

  onScopeDispose(() => {
    cleanup();
  });

  return {
    init,
  };
}
