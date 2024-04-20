import { Moon, Sun, SunMoon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/stores/theme/theme.store"

export const ThemeToggle = () => {
    const mode = useTheme(state => state.mode)
    const setTheme = useTheme(state => state.set)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    {
                        mode == 'light' &&
                        <Sun className="h-4 w-4" />
                    }
                    {
                        mode == 'dark' &&
                        <Moon className="h-4 w-4" />
                    }
                    {
                        mode == 'system' &&
                        <SunMoon className="h-4 w-4" />
                    }
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}