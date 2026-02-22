import { RegisterData } from '@/types/auth'
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
            const { data } = await axios.post<any>(`${BASE_URL}/auth/register`, payload)
            console.log('API response', data)
            return data;
        } catch (error) {
            handleApiError(error)
        }
    }
}