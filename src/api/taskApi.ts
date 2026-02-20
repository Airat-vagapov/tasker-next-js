import { ITask, INewTaskData } from "@/types/task";
import { getAllTasksParams } from '@/api/tasks.types'
import axios from "axios";

interface ApiResponse {
    status: string;
    result: ITask[];
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const taskApi = {
    getAllTasks: async ({ task_id, search, status, sortBy, order = 'desc', priority }: getAllTasksParams) => {
        try {
            const { data } = await axios.get<ApiResponse>(`${BASE_URL}/tasks`,
                {
                    params: { task_id, search, status, sortBy, order, priority },
                    timeout: 1000

                }
            )
            return data.result
        } catch (error) {
            handleApiError(error)
            throw error
        }
    },

    getActiveTasks: async () => {
        try {
            const { data } = await axios
                .get<ApiResponse>(`${BASE_URL}/tasks/status?id=1,2`)
            return data.result
        } catch (error) {
            handleApiError(error)
            throw error
        }

    },

    getDoneTasks: async () => {
        try {
            const { data } = await axios
                .get<ApiResponse>(`${BASE_URL}/tasks/status?id=3`)
            return data.result
        } catch (error) {
            handleApiError(error)
            throw error
        }

    },

    addTask: async (task: INewTaskData) => {
        try {
            const res = await axios.post(`${BASE_URL}/task`, task)
            return res
        } catch (error) {
            handleApiError(error)
            throw error
        }
    },

    deleteTask: async (id: number) => {

        (id)
        try {
            const res = await axios.delete(`${BASE_URL}/task/${id}`, { "method": 'DELETE' })
            return res
        } catch (error) {
            handleApiError(error)
            throw error
        }

    },

    // changeTaskStatus: async (id:number, task: ITask) => {
    changeTaskStatus: async (task: ITask) => {
        try {
            const res = await axios.post(`${BASE_URL}/task/${task.id}`, { task })
            return res.data
        } catch (error) {
            handleApiError(error)
            throw error
        }
    },

    getTaskById: async (id: string) => {
        try {
            const res = await axios.get(`${BASE_URL}/task/${id}`)
            return res
        } catch (error) {
            handleApiError(error)
            throw error
        }
    }
}

const handleApiError = (error: any) => {
    console.error('[API Error]:', error);
    const code = error.code;


    if (!error.response) {
        if (code === "ERR_NETWORK") {
            throw new Error("Ошибка. Проверьте настройки сети")
        }
        if (code === "ECONNABORTED") {
            throw new Error("Таймуат запроса. Попробуйте еще раз")
        }
        throw new Error("Ошибка сети. Проверьте подключение к интернету.");
    }

    const status = error.response.status;
    const message = error.response.data?.message || error.response.statusText;

    if (status === 404) {
        throw new Error("404 - Ошибка запроса. Адрес не найден.");
    } else if (status >= 500) {
        throw new Error("500 - Ошибка сервера. Попробуйте позже.");
    } else {
        throw new Error(`Ошибка при загрузке данных ${status}: ${message} \n ${error.response?.data.message}`);
    }







}