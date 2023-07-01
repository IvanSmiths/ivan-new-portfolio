import {create} from 'zustand'

export const useHoverStore = create(set => ({
    hover: "small", setHover: (newState) => set({hover: newState}),
}))

export const useUserScrollStore = create(set => ({
    userScroll: false, setUserScroll: (newState) => set({setUserScroll: newState}),
}))

