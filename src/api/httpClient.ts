import axios from 'axios';
import { useAuthStore } from '@/store/authStore';
import { authApi } from './authApi';
import router from 'next/router';

export const httpClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const authHttpClient = axios.create({
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
let isRefreshing = false;
let queue: Array<(token: string) => void> = [];

const processQueue = (token: string) => {
    queue.forEach(resolve => resolve(token))
    queue = []
}

httpClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;


        if (error.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve) => {
                    queue.push((token: string) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        resolve(httpClient(originalRequest));
                    })
                })
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const { accessToken } = await authApi.refreshToken();
                useAuthStore.getState().setAccessToken(accessToken);
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                processQueue(accessToken);
                return httpClient(originalRequest);
            } catch (error) {
                useAuthStore.getState().logout();
                router.push('/login');
                return Promise.reject(error);
            } finally {
                isRefreshing = false;
            }
        }
        return Promise.reject(error);
    }
)