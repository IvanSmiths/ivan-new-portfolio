import { nextTick, onMounted, onScopeDispose, ref, watch } from "vue";
import { useRoute } from "vue-router";

export function useWorkSectionAnimation() {
  const { $gsap, $SplitText } = useNuxtApp();
  const route = useRoute();

  const shortDescriptionRef = ref<HTMLElement | null>(null);

  let ctx: any = null;
  let split: any = null;

  function init() {
    if (!shortDescriptionRef.value) return;

    ctx?.revert();
    split?.revert();

    ctx = $gsap.context(() => {
      split = new $SplitText(shortDescriptionRef.value, {
        type: "lines",
        linesClass: "split-line",
      });

      const lines = split.lines;

      lines.forEach((line: HTMLElement) => {
        const wrapper = document.createElement("div");
        wrapper.style.overflow = "hidden";
        line.parentNode?.insertBefore(wrapper, line);
        wrapper.appendChild(line);
      });

      $gsap.set(lines, { y: "105%", opacity: 0 });

      const tl = $gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: shortDescriptionRef.value,
          start: "top 85%",
          once: true,
        },
      });

      tl.to(lines, {
        y: "0%",
        opacity: 1,
        duration: 0.9,
        stagger: 0.12,
      });
    }, shortDescriptionRef.value);
  }

  onMounted(() => init());

  watch(
    () => route.fullPath,
    async () => {
      await nextTick();
      init();
    },
  );

  onScopeDispose(() => {
    ctx?.revert();
    split?.revert();
  });

  return { shortDescriptionRef };
}
