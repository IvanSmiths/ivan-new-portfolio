import { create, StoreApi, UseBoundStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Animation = {
  fast: number;
  normal: number;
  medium: number;
  slow: number;
  slowest: number;
};

type IconDimension = {
  small: number;
  normal: number;
};

type Overlay = {
  isHidden: boolean;
  hide: () => void;
};

export enum ThemeMode {
  Light = "light",
  Dark = "dark",
}

export enum ThemeColors {
  Light = "#09090B",
  Dark = "#e7e7e7",
}

type Theme = {
  activeTheme: ThemeMode;
  setActiveTheme: (theme: ThemeMode) => void;
};

export const useAnimationStore: UseBoundStore<StoreApi<Animation>> =
  create<Animation>()(() => ({
    fast: 0.4,
    normal: 0.6,
    medium: 1,
    slow: 1.5,
    slowest: 2,
  }));

export const useIconDimensionStore: UseBoundStore<StoreApi<IconDimension>> =
  create<IconDimension>()(() => ({
    small: 20,
    normal: 30,
  }));

export const useOverlayStore: UseBoundStore<StoreApi<Overlay>> = create(
  persist<Overlay>(
    (set) => ({
      isHidden: true,
      hide: () => set(() => ({ isHidden: false })),
    }),
    {
      name: "overlay-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export const useThemeStore: UseBoundStore<StoreApi<Theme>> = create(
  persist<Theme>(
    (set, get) => ({
      activeTheme: ThemeMode.Light,
      setActiveTheme: (theme: ThemeMode) => {
        set({ activeTheme: (get().activeTheme = theme) });
      },
    }),
    {
      name: "theme",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
