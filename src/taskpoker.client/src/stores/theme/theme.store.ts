import { StateCreator, create } from "zustand";
import { devtools, persist } from 'zustand/middleware'
import { LocalStorage } from "@/stores/storages/localStorage";

type Theme = "dark" | "light" | "system"

type ThemeState = {
    mode: Theme,
    toggle: () => void,
    set: (mode: Theme) => void
}

const ThemeState: StateCreator<ThemeState> = (set) => ({
    mode: 'light',
    set: (mode: Theme) => set((state) => ({ ...state, mode })),
    toggle: () => set((state) => ({ ...state, mode: state.mode === "light" ? "dark" : "light" }))
})

export const useTheme = create<ThemeState>()(
    devtools(
        persist(
            ThemeState,
            {
                name: 'theme-storage',
                storage: LocalStorage
            },
        ),
    ),
)