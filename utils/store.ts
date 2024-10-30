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

export enum ThemeMode {
  Light = "Light",
  Dark = "Dark",
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

export interface Position {
  x: number;
  y: number;
}

interface ButtonStore {
  position: Position;
  attempts: number;
  isTransitioning: boolean;
  incrementAttempts: () => void;
  setPosition: (position: Position) => void;
  setTransitioning: (transitioning: boolean) => void;
  resetPosition: () => void;
  resetAttempts: () => void;
}

export const useButtonStore = create<ButtonStore>()(
  persist(
    (set) => ({
      position: { x: 50, y: 50 },
      attempts: 0,
      isTransitioning: false,
      incrementAttempts: () =>
        set((state) => ({ attempts: state.attempts + 1 })),
      setPosition: (position) => set({ position }),
      setTransitioning: (transitioning) =>
        set({ isTransitioning: transitioning }),
      resetPosition: () => set({ position: { x: 50, y: 50 } }),
      resetAttempts: () => set({ attempts: 0 }),
    }),
    {
      name: "button-storage",
    },
  ),
);
