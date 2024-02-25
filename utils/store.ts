import { create, StoreApi, UseBoundStore } from "zustand";

type Animation = {
  fast: number;
  normal: number;
  medium: number;
  slow: number;
  slowest: number;
};

export const useAnimationStore: UseBoundStore<StoreApi<Animation>> =
  create<Animation>()(() => ({
    fast: 0.4,
    normal: 0.6,
    medium: 1,
    slow: 1.5,
    slowest: 2,
  }));
