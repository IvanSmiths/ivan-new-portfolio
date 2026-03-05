import { onScopeDispose, type Ref } from "vue";
import { useSplitTextAnimation } from "~/composables/animations/global/useSplitAnimation";
import { useLoaderSession } from "~/composables/sessions/useLoaderSession";

type ParagraphRevealRefs = {
  rootRef: Ref<HTMLElement | null>;
  titleRef: Ref<HTMLElement | null>;
  cityRef: Ref<HTMLElement | null>;
  weatherRef: Ref<HTMLElement | null>;
  timeRef: Ref<HTMLElement | null>;
};

export function useParagraphReveal(refs: ParagraphRevealRefs) {
  const { $gsap } = useNuxtApp();
  const { prepareReveal } = useSplitTextAnimation();
  const { hasSeenLoader, onLoaderDone } = useLoaderSession();

  let ctx: gsap.Context | null = null;
  let stopListening: (() => void) | null = null;
  let paragraphReveal: ReturnType<typeof prepareReveal> | null = null;

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
    paragraphReveal?.revert();
    stopListening = null;
    ctx = null;
    paragraphReveal = null;
  }

  function createReveal() {
    paragraphReveal?.revert();
    paragraphReveal = prepareReveal(getTargets(), {
      duration: 2,
      stagger: 0.2,
      yPercent: 110,
    });

    return paragraphReveal;
  }

  function runAnimation() {
    const root = refs.rootRef.value;
    const targets = getTargets();

    if (!root || !targets.length) return;

    ctx?.revert();
    ctx = $gsap.context(() => {
      createReveal().addToTimeline($gsap.timeline());
    }, root);
  }

  function init() {
    cleanup();

    const targets = getTargets();
    if (!targets.length) return;

    if (hasSeenLoader()) {
      createReveal().setVisibleState();
      return;
    }

    createReveal().setHiddenState();

    stopListening = onLoaderDone(() => runAnimation());
  }

  onScopeDispose(() => {
    cleanup();
  });

  return {
    init,
  };
}
