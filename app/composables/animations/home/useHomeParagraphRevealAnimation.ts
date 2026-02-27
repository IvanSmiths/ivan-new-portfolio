import { onScopeDispose, type Ref } from "vue";
import { useWorksLoaderSession } from "~/composables/animations/home/useWorksLoaderSession";

type ParagraphRevealRefs = {
  rootRef: Ref<HTMLElement | null>;
  titleRef: Ref<HTMLElement | null>;
  cityRef: Ref<HTMLElement | null>;
  weatherRef: Ref<HTMLElement | null>;
  timeRef: Ref<HTMLElement | null>;
};

export function useHomeParagraphRevealAnimation(refs: ParagraphRevealRefs) {
  const { $gsap } = useNuxtApp();
  const { hasSeenLoader, onLoaderDone } = useWorksLoaderSession();

  let ctx: gsap.Context | null = null;
  let stopListening: (() => void) | null = null;

  function getTargets() {
    return [
      refs.titleRef.value,
      refs.cityRef.value,
      refs.weatherRef.value,
      refs.timeRef.value,
    ].filter(Boolean) as HTMLElement[];
  }

  function cleanup() {
    stopListening?.();
    ctx?.revert();
    stopListening = null;
    ctx = null;
  }

  function setFinalState(targets: HTMLElement[]) {
    $gsap.set(targets, {
      yPercent: 0,
      autoAlpha: 1,
      clearProps: "transform,opacity,visibility,willChange",
    });
  }

  function runAnimation() {
    const root = refs.rootRef.value;
    const targets = getTargets();

    if (!root || !targets.length) return;

    ctx?.revert();
    ctx = $gsap.context(() => {
      $gsap.set(targets, {
        yPercent: 110,
        autoAlpha: 0,
        willChange: "transform,opacity",
      });

      $gsap.to(targets, {
        yPercent: 0,
        autoAlpha: 1,
        duration: 2,
        stagger: 0.2,
        ease: "power3.out",
        clearProps: "transform,opacity,visibility,willChange",
      });
    }, root);
  }

  function init() {
    cleanup();

    const targets = getTargets();
    if (!targets.length) return;

    if (hasSeenLoader()) {
      setFinalState(targets);
      return;
    }

    $gsap.set(targets, {
      yPercent: 110,
      autoAlpha: 0,
      willChange: "transform,opacity",
    });

    stopListening = onLoaderDone(() => runAnimation());
  }

  onScopeDispose(() => {
    cleanup();
  });

  return {
    init,
  };
}
