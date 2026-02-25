export interface SplitTextAnimationOptions {
  duration?: number;
  delay?: number;
  stagger?: number;
  yPercent?: number;
  ease?: string;
}

export function useSplitTextAnimation(gsap: any) {
  const splitAndWrapLines = (el: HTMLElement) => {
    const originalText = el.textContent ?? "";
    el.textContent = "";

    const charSpans: HTMLSpanElement[] = [];
    for (let i = 0; i < originalText.length; i++) {
      const ch = originalText[i];
      const span = document.createElement("span");
      span.style.display = "inline-block";
      if (ch === " ") span.innerHTML = "&nbsp;";
      else span.textContent = ch ?? "";
      el.appendChild(span);
      charSpans.push(span);
    }

    const groups: HTMLSpanElement[][] = [];
    let currentTop: number | null = null;

    for (const span of charSpans) {
      const top = span.offsetTop;
      if (currentTop === null || top !== currentTop) {
        groups.push([span]);
        currentTop = top;
      } else {
        groups[groups.length - 1]?.push(span);
      }
    }

    el.textContent = "";

    const lineWrappers: HTMLSpanElement[] = [];
    for (const group of groups) {
      const line = document.createElement("span");
      line.style.cssText = "display:block; overflow:hidden; line-height:inherit;";

      const inner = document.createElement("span");
      inner.style.cssText = "display:inline-block; white-space:nowrap;";

      for (const s of group) inner.appendChild(s);
      line.appendChild(inner);
      el.appendChild(line);
      lineWrappers.push(line);
    }

    const chars = groups.flat();
    return { chars, lineWrappers };
  };

  const prepareSplitReveal = (
    el: HTMLElement | null | undefined,
    options: SplitTextAnimationOptions = {},
  ) => {
    if (!el) return { chars: [], lineWrappers: [], addToTimeline: () => {} };

    const {
      duration = 0.9,
      delay = 0.8,
      stagger = 0.018,
      yPercent = 120,
      ease = "power3.out",
    } = options;

    const { chars, lineWrappers } = splitAndWrapLines(el);

    gsap.set(chars, { yPercent, willChange: "transform" });

    const addToTimeline = (tl: gsap.core.Timeline, position: number | string = 0) => {
      tl.to(chars, { duration, delay, yPercent: 0, stagger, ease }, position);
    };

    return { chars, lineWrappers, addToTimeline };
  };

  return { splitAndWrapLines, prepareSplitReveal };
}
