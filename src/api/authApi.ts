import { RegisterData, AuthData, AuthResponse } from '@/types/auth'
import { IUser } from "@/types/user";
import axios from 'axios'
import { handleApiError } from "@/api/apiErrorHandler"

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
            const { data } = await axios.post<IUser>(`${BASE_URL}/auth/register`, payload)
            console.log('API response', data)
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
            const { data } = await axios.post<AuthResponse>(`${BASE_URL}/auth/login`, payload)
            console.log('API response', data)
            return data;
        } catch (error) {
            handleApiError(error)
        }
    }
}
