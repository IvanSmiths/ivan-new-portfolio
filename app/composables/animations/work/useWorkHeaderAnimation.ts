import { onMounted, onScopeDispose, ref } from "vue";

export function useWorkHeaderAnimation() {
  const { $gsap } = useNuxtApp();

  const rootRef = ref<HTMLElement | null>(null);
  const imageWrapRef = ref<HTMLElement | null>(null);
  const titleRef = ref<HTMLElement | null>(null);
  const roleRef = ref<HTMLElement | null>(null);
  const metaBarRef = ref<HTMLElement | null>(null);
  const spacerRef = ref<HTMLElement | null>(null);

  let ctx: any = null;

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
        const lastGroup = groups[groups.length - 1];
        if (lastGroup) {
          lastGroup.push(span);
        }
      }
    }

    el.textContent = "";

    const lineWrappers: HTMLSpanElement[] = [];
    for (const group of groups) {
      const line = document.createElement("span");
      line.style.display = "block";
      line.style.overflow = "hidden";
      line.style.lineHeight = "inherit";

      const inner = document.createElement("span");
      inner.style.display = "inline-block";
      inner.style.whiteSpace = "nowrap";

      for (const s of group) inner.appendChild(s);

      line.appendChild(inner);
      el.appendChild(line);
      lineWrappers.push(line);
    }

    const chars: HTMLSpanElement[] = [];
    for (const group of groups) chars.push(...group);

    return { chars, lineWrappers };
  };

  onMounted(() => {
    if (!rootRef.value || !imageWrapRef.value) return;

    const multiplier = 7;
    const extraSpaceNeeded = imageWrapRef.value.offsetHeight * (multiplier / 10);

    ctx = $gsap.context(() => {
      $gsap.set(imageWrapRef.value, {
        translateY: 0,
        scaleX: 1,
        willChange: "transform",
        objectPosition: "top",
      });

      $gsap.set(spacerRef.value, { height: extraSpaceNeeded });

      const titleEl = titleRef.value ?? undefined;
      const roleEl = roleRef.value ?? undefined;

      const titleSplit = titleEl ? splitAndWrapLines(titleEl) : { chars: [], lineWrappers: [] };
      const roleSplit = roleEl ? splitAndWrapLines(roleEl) : { chars: [], lineWrappers: [] };

      $gsap.set([...titleSplit.chars, ...roleSplit.chars], {
        yPercent: 120,
        willChange: "transform",
      });

      if (metaBarRef.value) {
        $gsap.set(metaBarRef.value, { y: 18, willChange: "transform" });
      }

      $gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to(
          imageWrapRef.value,
          {
            duration: 1.25,
            translateY: `${multiplier * 10}%`,
            ease: "power3.inOut",
          },
          0,
        )
        .to(
          titleSplit.chars,
          {
            duration: 0.9,
            delay: 0.8,
            yPercent: 0,
            stagger: 0.018,
          },
          0.05,
        )
        .to(
          roleSplit.chars,
          {
            duration: 0.9,
            delay: 0.82,
            yPercent: 0,
            stagger: 0.02,
          },
          0.08,
        )
        .to(
          metaBarRef.value,
          {
            duration: 0.9,
            delay: 0.8,
            y: 0,
          },
          0.12,
        );
    }, rootRef.value);
  });

  onScopeDispose(() => ctx?.revert());

  return { rootRef, imageWrapRef, titleRef, roleRef, metaBarRef, spacerRef };
}
