import { ITask, INewTaskData } from "@/types/task";
import { getAllTasksParams } from '@/api/tasks.types'
import { handleApiError } from "@/api/apiErrorHandler"
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
                    // timeout: 30000

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
            const res = await axios.delete(`${BASE_URL}/task/${id}`)
            return res
        } catch (error) {
            handleApiError(error)
            throw error
        }
    },

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

export { handleApiError };
