import { create } from 'zustand'

interface HoverState {
    hover: string;
    setHover: (newState: string) => void;
    scrollHint: boolean;
    setScrollHint: (newState: boolean) => void;
}

interface AnimationState {
    duration: number;
    durationFast: number,
    durationMedium: number,
    durationSlow: number,
}

export const useHoverStore = create<HoverState>()((set) => ({
    hover: "small",
    setHover: (newState) => set({hover: newState}),
    scrollHint: true,
    setScrollHint: (newState) => set({scrollHint: newState}),
}))

export const useAnimationStore = create<AnimationState>()((set) => ({
    duration: 0.3,
    durationFast: 0.3,
    durationMedium: 0.5,
    durationSlow: 1.5,
}))