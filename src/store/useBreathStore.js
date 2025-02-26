// src/store/useBreathStore.js
import { create } from "zustand";

const useBreathStore = create((set) => ({
    holding: false,
    time: 0,
    sessionCount: 0,
    setHolding: (value) => set({ holding: value, time: value ? 0 : useBreathStore.getState().time }),
    increaseTime: () => set((state) => ({ time: state.time + 1 })),
    increaseSession: () => set((state) => ({ sessionCount: state.sessionCount + 1 }))
}));

export default useBreathStore;