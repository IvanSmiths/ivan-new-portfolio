import { computed, ref, type Ref, unref } from "vue";

type MaybeRef<T> = T | Ref<T>;

export function useClipboard(options?: { copiedTimeout?: number }) {
  const copiedTimeout = options?.copiedTimeout ?? 1600;

  const copied = ref(false);
  const error = ref<unknown>(null);

  const isSupported = computed(() => {
    return typeof navigator !== "undefined" && !!navigator.clipboard?.writeText;
  });

  const setCopiedTemporarily = () => {
    copied.value = true;
    window.setTimeout(() => (copied.value = false), copiedTimeout);
  };

  const copyWithExecCommand = (text: string) => {
    const el = document.createElement("textarea");
    el.value = text;

    el.style.position = "fixed";
    el.style.top = "0";
    el.style.left = "0";
    el.style.opacity = "0";

    document.body.appendChild(el);
    el.focus();
    el.select();

    const ok = document.execCommand("copy");
    document.body.removeChild(el);

    if (!ok) throw new Error("execCommand copy failed");
  };

  const copy = async (value: MaybeRef<string>) => {
    error.value = null;
    const text = (unref(value) ?? "").toString();

    if (!text) return false;

    if (typeof window === "undefined" || typeof document === "undefined") {
      return false;
    }

    try {
      if (isSupported.value) {
        await navigator.clipboard.writeText(text);
      } else {
        copyWithExecCommand(text);
      }

      setCopiedTemporarily();
      return true;
    } catch (e) {
      error.value = e;
      return false;
    }
  };

  return {
    copy,
    copied,
    isSupported,
    error,
  };
}
