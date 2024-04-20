import { StateStorage, createJSONStorage } from "zustand/middleware";

const LocalState: StateStorage = {
    getItem: (name: string): string | Promise<string | null> | null => {
        const data = localStorage.getItem(name);
        return data;
    },
    setItem: (name: string, value: string): void => {
        localStorage.setItem(name, value)
    },
    removeItem: function (name: string): void | Promise<void> {
        localStorage.removeItem(name);
    },
}

export const LocalStorage = createJSONStorage(() => LocalState);