import { StateStorage, createJSONStorage } from "zustand/middleware";

const SessionState: StateStorage = {
    getItem: (name: string): string | Promise<string | null> | null => {
        const data = sessionStorage.getItem(name);
        return data;
    },
    setItem: (name: string, value: string): void => {
        sessionStorage.setItem(name, value)
    },
    removeItem: function (name: string): void | Promise<void> {
        sessionStorage.removeItem(name);
    },
}

export const SessionStorage = createJSONStorage(() => SessionState);