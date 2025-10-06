// src/store/useBreathStore.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useBreathStore = create(
    persist(
        (set, get) => ({
            holding: false,
            time: 0,
            setTime: (value) => set({ time: value }),
            
            sessionCount: 0,
            totalSessions: 0,
            totalTime: 0,
            averageTime: 0,
            bestTime: 0,
            lastTime: 0,

            // settings
            theme: "auto", // "auto" | "light" | "dark"
            setTheme: (value) => set({ theme: value }),

            // actions
            setHolding: (value) => set({ holding: value, time: value ? 0 : get().time }),
            increaseTime: () => set((state) => ({ time: state.time + 1 })),
            increaseSession: () => set((state) => ({ sessionCount: state.sessionCount + 1 })),

            toggleHolding: () => {
                const { holding, time } = get();
                if (holding) {
                    // finishing a hold → finalize stats
                    set((state) => {
                        const newLast = time;
                        const newTotalSessions = state.totalSessions + 1;
                        const newTotalTime = state.totalTime + newLast;
                        const newAverage = newTotalSessions > 0 ? Math.round(newTotalTime / newTotalSessions) : 0;
                        const newBest = Math.max(state.bestTime, newLast);
                        return {
                            holding: false,
                            time: 0,
                            // keep legacy counter in sync when finishing a session
                            sessionCount: state.sessionCount + 1,
                            totalSessions: newTotalSessions,
                            totalTime: newTotalTime,
                            averageTime: newAverage,
                            bestTime: newBest,
                            lastTime: newLast
                        };
                    });
                } else {
                    // starting a new hold
                    set({ holding: true, time: 0 });
                }
            },

            resetStats: () =>
                set({
                    sessionCount: 0,
                    totalSessions: 0,
                    totalTime: 0,
                    averageTime: 0,
                    bestTime: 0,
                    lastTime: 0
                })
        }),
        {
            name: "breathing-store",
            storage: createJSONStorage(() => localStorage),
            // only persist non-ephemeral fields
            partialize: (state) => ({
                sessionCount: state.sessionCount,
                totalSessions: state.totalSessions,
                totalTime: state.totalTime,
                averageTime: state.averageTime,
                bestTime: state.bestTime,
                lastTime: state.lastTime,
                theme: state.theme
            })
        }
    )
);

export default useBreathStore;