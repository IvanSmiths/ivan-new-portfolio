import {create} from 'zustand'

export const useHoverStore = create(set => ({
    hover: "small",
    setHover: (newState) => set({hover: newState}),
    userScroll: 0,
    setUserScroll: (userScroll) => set({setUserScroll: userScroll}),
}))