import { create, StoreApi, UseBoundStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Overlay = {
  isHidden: boolean;
  hide: () => void;
};

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
