import {create} from 'zustand'

export const useHoverStore = create(set => ({
    hover: "small",
    setHover: (newState) => set({hover: newState}),
    scrollHint: true,
    setScrollHint: (newState) => set({scrollHint: newState}),
}))

export const useAnimationStore = create(set => ({
    duration: 0.3,
}))