import type { Component } from "vue";

type CursorHelperMode = "default" | "hover";

type CursorHelperState = {
  mode: CursorHelperMode;
  iconSrc: string | null;
  iconComponent: Component | null;
  hoverText: string | null;
};

const interactionBus = ref(0);

export const useCursorHelper = () => {
  const state = useState<CursorHelperState>("cursor-helper", () => ({
    mode: "default",
    iconSrc: null,
    iconComponent: null,
    hoverText: null,
  }));

  let hoverTextTimer: number | null = null;

  const setHover = (opts?: { iconComponent?: Component | null; text?: string | null }) => {
    state.value.mode = "hover";
    state.value.iconComponent = opts?.iconComponent ?? null;
    state.value.hoverText = opts?.text ?? null;
  };

  const setHoverText = (text: string | null) => {
    state.value.hoverText = text;
  };

  const showTempHoverText = (text: string, ms = 1800) => {
    if (hoverTextTimer) window.clearTimeout(hoverTextTimer);
    state.value.mode = "hover";
    state.value.hoverText = text;

    hoverTextTimer = window.setTimeout(() => {
      state.value.hoverText = null;
      hoverTextTimer = null;
    }, ms);
  };

  const clearHover = () => {
    if (hoverTextTimer) {
      window.clearTimeout(hoverTextTimer);
      hoverTextTimer = null;
    }
    state.value.mode = "default";
    state.value.iconSrc = null;
    state.value.iconComponent = null;
    state.value.hoverText = null;
  };

  const notifyInteraction = () => {
    interactionBus.value++;
  };

  return {
    state,
    setHover,
    setHoverText,
    showTempHoverText,
    clearHover,
    notifyInteraction,
    interactionBus,
  };
};
