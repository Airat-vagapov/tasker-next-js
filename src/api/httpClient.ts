import axios from 'axios';
import { useAuthStore } from '@/store/authStore';
import { redirect } from 'next/navigation';

export const httpClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Добавление токена к каждому запросу
httpClient.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})

// Обновление токена при истечении срока действия
httpClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const { data } = await axios.post('/auth/refresh');
                useAuthStore.getState().setAccessToken(data.accessToken);
                originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                return httpClient(originalRequest);
            } catch (error) {
                useAuthStore.getState().logout();
                redirect('/login');
            }
        }
        return Promise.reject(error);
    }
)