import { type Ref, watch } from "vue";

export function useTextSwap(
  el: Ref<HTMLElement | null>,
  value: Ref<string | null>,
  fallback: string
) {
  watch(
    value,
    (newValue) => {
      if (!el.value) return;
      el.value.textContent = newValue ?? fallback;
    },
    { immediate: true }
  );
}
