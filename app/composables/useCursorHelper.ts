import type { Component } from "vue";

type CursorHelperMode = "default" | "hover";

type CursorHelperState = {
  mode: CursorHelperMode;
  iconSrc: string | null;
  iconComponent: Component | null;
};

const interactionBus = ref(0);

export const useCursorHelper = () => {
  const state = useState<CursorHelperState>("cursor-helper", () => ({
    mode: "default",
    iconSrc: null,
    iconComponent: null,
  }));

  const setHover = (iconComponent: Component) => {
    state.value.mode = "hover";
    state.value.iconComponent = iconComponent;
  };

  const clearHover = () => {
    state.value.mode = "default";
    state.value.iconSrc = null;
    state.value.iconComponent = null;
  };

  const notifyInteraction = () => {
    interactionBus.value++;
  };

  return { state, setHover, clearHover, notifyInteraction, interactionBus };
};
