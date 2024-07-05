import { create, StoreApi, UseBoundStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Animation = {
  fast: number;
  normal: number;
  medium: number;
  slow: number;
  slowest: number;
};

type Overlay = {
  isHidden: boolean;
  hide: () => void;
};

enum BrandColors {
  red = "#FF4D4D",
  blue = "#C9C8FB",
  pink = "#FBC8CB",
  green = "#BFF6C4",
  yellow = "#FBF9C8",
}

type Colors = {
  colors: BrandColors[];
  backgroundColor: string;
  setBackgroundColor: () => void;
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

export const useColorStore: UseBoundStore<StoreApi<Colors>> = create((set) => ({
  colors: [
    BrandColors.red,
    BrandColors.blue,
    BrandColors.pink,
    BrandColors.green,
    BrandColors.yellow,
  ],
  backgroundColor: "",
  setBackgroundColor: () =>
    set((state: Colors) => {
      const randomColor =
        state.colors[Math.floor(Math.random() * state.colors.length)];
      return { backgroundColor: randomColor };
    }),
}));
