import { StateCreator, create } from "zustand";
import { devtools, persist } from 'zustand/middleware'
import { SessionStorage } from "@/stores/storages/sessionStorage";
import { User } from "@/types";

type AuthState = {
    token: string | undefined,
    user: User | undefined, 
    auth: (session: string) => void,
    set: (user: User) => void,
    clear: () => void
}

const AuthState: StateCreator<AuthState> = (set) => ({
    token: undefined,
    user: undefined,
    auth: (token: string) => set((state) => ({ ...state, token })),
    set: (user) => set((state) => ({ ...state, user }), true),
    clear: () => set((state) => ({ ...state, token: undefined, user: undefined }), true)
})

export const useAuth = create<AuthState>()(
    devtools(
        persist(
            AuthState,
            {
                name: 'auth-storage',
                storage: SessionStorage
            },
        ),
    ),
)