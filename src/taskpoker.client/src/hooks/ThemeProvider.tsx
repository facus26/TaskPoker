import { useTheme } from "@/stores/theme/theme.store"
import { PropsWithChildren, useEffect } from "react"

export function ThemeProvider({ children }: PropsWithChildren) {
    const mode = useTheme(state => state.mode);

    useEffect(() => {
        const root = window.document.documentElement

        root.classList.remove("light", "dark")

        if (mode === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
                .matches
                ? "dark"
                : "light"

            root.classList.add(systemTheme)
            return
        }

        root.classList.add(mode)
    }, [mode])

    return (
        <>
            {children}
        </>
    )
}