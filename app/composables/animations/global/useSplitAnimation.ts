export type SplitTextMode = "chars" | "words" | "lines";

export interface SplitTextAnimationOptions {
  splitBy?: SplitTextMode;
  duration?: number;
  delay?: number;
  stagger?: number | gsap.StaggerVars;
  yPercent?: number;
  ease?: string;
  clipLines?: boolean;
  autoAlpha?: number;
  linesClass?: string;
}

type PreparedSplitReveal = {
  items: HTMLElement[];
  addToTimeline: (tl: gsap.core.Timeline, position?: number | string) => gsap.core.Timeline;
  setHiddenState: () => void;
  setVisibleState: () => void;
  revert: () => void;
};

type RevealControllerOptions = {
  duration: number;
  delay: number;
  stagger: number | gsap.StaggerVars;
  yPercent: number;
  ease: string;
  autoAlpha: number;
};

function resolveSplitType(splitBy: SplitTextMode) {
  if (splitBy === "chars") return "lines,chars";
  if (splitBy === "words") return "lines,words";
  return "lines";
}

function pickTargets(split: any, splitBy: SplitTextMode): HTMLElement[] {
  if (splitBy === "chars") return split.chars ?? [];
  if (splitBy === "words") return split.words ?? [];
  return split.lines ?? [];
}

export function splitTextForRender(text: string): string[] {
  return Array.from(text, (char) => (char === " " ? "\u00A0" : char));
}

export function useSplitTextAnimation() {
  const { $gsap, $SplitText } = useNuxtApp();

  function createRevealController(
    items: HTMLElement[],
    options: RevealControllerOptions,
    revert: () => void = () => {},
  ): PreparedSplitReveal {
    const { duration, delay, stagger, yPercent, ease, autoAlpha } = options;

    function setHiddenState() {
      $gsap.set(items, {
        yPercent,
        autoAlpha,
        willChange: "transform,opacity",
      });
    }

    function setVisibleState() {
      $gsap.set(items, {
        yPercent: 0,
        autoAlpha: 1,
        clearProps: "transform,opacity,visibility,willChange",
      });
    }

    function addToTimeline(tl: gsap.core.Timeline, position: number | string = 0) {
      return tl.to(
        items,
        {
          duration,
          delay,
          yPercent: 0,
          autoAlpha: 1,
          stagger,
          ease,
          clearProps: "transform,opacity,visibility,willChange",
        },
        position,
      );
    }

    setHiddenState();

    return {
      items,
      addToTimeline,
      setHiddenState,
      setVisibleState,
      revert,
    };
  }

  function prepareSplitReveal(
    el: HTMLElement | null | undefined,
    options: SplitTextAnimationOptions = {},
  ): PreparedSplitReveal {
    if (!el) {
      return {
        items: [],
        addToTimeline: (tl: gsap.core.Timeline) => tl,
        setHiddenState: () => {},
        setVisibleState: () => {},
        revert: () => {},
      };
    }

    const {
      splitBy = "chars",
      duration = 0.9,
      delay = 0,
      stagger = 0.018,
      yPercent = 120,
      ease = "power3.out",
      clipLines = true,
      autoAlpha = 0,
      linesClass = "split-line",
    } = options;

    const split = new $SplitText(el, {
      type: resolveSplitType(splitBy),
      linesClass,
      mask: clipLines ? "lines" : undefined,
    });

    const items = pickTargets(split, splitBy);

    return createRevealController(items, {
      duration,
      delay,
      stagger,
      yPercent,
      ease,
      autoAlpha,
    }, () => split.revert());
  }

  function prepareReveal(
    targets: Array<HTMLElement | null | undefined> | HTMLElement | null | undefined,
    options: Omit<SplitTextAnimationOptions, "splitBy" | "clipLines" | "linesClass"> = {},
  ): PreparedSplitReveal {
    const items = (Array.isArray(targets) ? targets : [targets]).filter(Boolean) as HTMLElement[];

    if (!items.length) {
      return {
        items: [],
        addToTimeline: (tl: gsap.core.Timeline) => tl,
        setHiddenState: () => {},
        setVisibleState: () => {},
        revert: () => {},
      };
    }

    const {
      duration = 0.9,
      delay = 0,
      stagger = 0.018,
      yPercent = 120,
      ease = "power3.out",
      autoAlpha = 0,
    } = options;

    return createRevealController(items, {
      duration,
      delay,
      stagger,
      yPercent,
      ease,
      autoAlpha,
    });
  }

  return { prepareSplitReveal, prepareReveal };
}
