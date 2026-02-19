type CursorHelperMode = "default" | "hover";

type CursorHelperState = {
  mode: CursorHelperMode;
  iconSrc: string | null;
};

const interactionBus = ref(0);

export const useCursorHelper = () => {
  const state = useState<CursorHelperState>("cursor-helper", () => ({
    mode: "default",
    iconSrc: null,
  }));

  const setHover = (iconSrc: string) => {
    state.value.mode = "hover";
    state.value.iconSrc = iconSrc;
  };

  const clearHover = () => {
    state.value.mode = "default";
    state.value.iconSrc = null;
  };

  const notifyInteraction = () => {
    interactionBus.value++;
  };

  return { state, setHover, clearHover, notifyInteraction, interactionBus };
};
