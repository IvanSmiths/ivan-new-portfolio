import type { Directive } from "vue";

interface TextSwapBinding {
  value: string | null;  // current value
  fallback: string;      // fallback text
}

export const vTextSwap: Directive<HTMLElement, TextSwapBinding> = {
  getSSRProps(binding) {
    return {
      textContent: binding.value?.value ?? binding.value?.fallback ?? ""
    };
  },
  mounted(el, binding) {
    el.textContent = binding.value?.value ?? binding.value?.fallback ?? "";
  },
  updated(el, binding) {
    el.textContent = binding.value?.value ?? binding.value?.fallback ?? "";
  }
};
