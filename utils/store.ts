import { create, StoreApi, UseBoundStore } from "zustand";

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

export const useAnimationStore: UseBoundStore<StoreApi<Animation>> =
  create<Animation>()(() => ({
    fast: 0.4,
    normal: 0.6,
    medium: 1,
    slow: 1.5,
    slowest: 2,
  }));

export const useOverlayStore: UseBoundStore<StoreApi<Overlay>> =
  create<Overlay>((set) => ({
    isHidden: true,
    hide: () => set(() => ({ isHidden: false })),
  }));
