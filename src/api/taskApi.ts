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
        const payload = {
            params: { task_id, search, status, sortBy, order, priority },
        }
        try {
            const { data } = await axios.get<ApiResponse>(`${BASE_URL}/tasks`, payload)
            return data.result
        } catch (error) {
            handleApiError(error)
        }
    },

    getActiveTasks: async () => {
        try {
            const { data } = await axios
                .get<ApiResponse>(`${BASE_URL}/tasks/status?id=1,2`)
            return data.result
        } catch (error) {
            handleApiError(error)
        }

    },

    getDoneTasks: async () => {
        try {
            const { data } = await axios
                .get<ApiResponse>(`${BASE_URL}/tasks/status?id=3`)
            return data.result
        } catch (error) {
            handleApiError(error)
        }

    },

    addTask: async (task: INewTaskData) => {
        try {
            const res = await axios.post(`${BASE_URL}/task`, task)
            return res
        } catch (error) {
            handleApiError(error)
        }
    },

    deleteTask: async (id: number) => {

        (id)
        try {
            const res = await axios.delete(`${BASE_URL}/task/${id}`)
            return res
        } catch (error) {
            handleApiError(error)
        }
    },

    changeTaskStatus: async (task: ITask) => {
        try {
            const res = await axios.post(`${BASE_URL}/task/${task.id}`, { task })
            return res.data
        } catch (error) {
            handleApiError(error)
        }
    },

    getTaskById: async (id: string) => {
        try {
            const res = await axios.get(`${BASE_URL}/task/${id}`)
            return res
        } catch (error) {
            handleApiError(error)
        }
    }
}

export { handleApiError };
