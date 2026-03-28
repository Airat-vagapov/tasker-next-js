import { RegisterData, AuthData, AuthResponse } from '@/types/auth'
import { IUser } from "@/types/user";
import axios from 'axios'
import { handleApiError } from "@/api/apiErrorHandler"
import { useAuthStore } from '@/store/authStore';
import { authHttpClient } from './httpClient';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const authApi = {
    register: async ({ firstName, lastName, username, password, role }: RegisterData) => {
        const payload =
        {
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password,
            role: role,
        }
        try {
            const { data } = await authHttpClient.post<IUser>(`/auth/register`, payload)
            return data;
        } catch (error) {
            handleApiError(error)
        }
    },
    login: async ({ username, password }: AuthData) => {
        const payload = {
            username: username,
            password: password,
        }
        try {
            const { data } = await authHttpClient.post<AuthResponse>(`/auth/login`, payload, {
                withCredentials: true
            })
            useAuthStore.getState().setAccessToken(data.accessToken)
            useAuthStore.getState().setUser(data.user)
        } catch (error) {
            handleApiError(error)
        }
    },
    refreshToken: async () => {
        try {
            const { data } = await authHttpClient.post<any>(`/auth/refresh`, {}, {
                withCredentials: true
            })
            return data;
        } catch (error) {
            handleApiError(error)
        }
    }
}
