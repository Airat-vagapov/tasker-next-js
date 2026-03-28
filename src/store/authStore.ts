import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { IUser } from "@/types/user";

interface IAuthStore {
    accessToken: string | null;
    user: IUser | null,
    setAccessToken: (token: string) => void;
    setUser: (user: IUser) => void;
    logout: () => void;
}

export const useAuthStore = create<IAuthStore>()(
    devtools(
        persist(
            (set) => ({
                accessToken: null,
                user: null,
                setAccessToken: (token: string) => set({ accessToken: token }),
                setUser: (user: IUser) => set({ user: user }),
                logout: () => set({ accessToken: null, user: null })
            }),
            {
                name: 'auth-storage',
                partialize: (state) => ({ user: state.user }),
            }
        ),
        { name: 'AuthStore' }
    )
)