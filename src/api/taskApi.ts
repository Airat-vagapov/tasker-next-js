import { ITask, INewTaskData } from "@/types/task";
import { getAllTasksParams } from '@/api/tasks.types'
import { handleApiError } from "@/api/apiErrorHandler"
import { httpClient } from "@/api/httpClient";

interface ApiResponse {
    status: string;
    result: ITask[];
}

export const taskApi = {
    getAllTasks: async ({ task_id, search, status, sortBy, order = 'desc', priority }: getAllTasksParams) => {
        const payload = {
            params: { task_id, search, status, sortBy, order, priority },
        }
        try {
            const { data } = await httpClient.get<ApiResponse>(`/tasks`, payload)
            return data.result
        } catch (error) {
            handleApiError(error)
        }
    },

    getActiveTasks: async () => {
        try {
            const { data } = await httpClient.get<ApiResponse>(`/tasks/status?id=1,2`)
            return data.result
        } catch (error) {
            handleApiError(error)
        }

    },

    getDoneTasks: async () => {
        try {
            const { data } = await httpClient.get<ApiResponse>(`/tasks/status?id=3`)
            return data.result
        } catch (error) {
            handleApiError(error)
        }

    },

    addTask: async (task: INewTaskData) => {
        try {
            const res = await httpClient.post(`/task`, task)
            return res
        } catch (error) {
            handleApiError(error)
        }
    },

    deleteTask: async (id: number) => {

        (id)
        try {
            const res = await httpClient.delete(`/task/${id}`)
            return res
        } catch (error) {
            handleApiError(error)
        }
    },

    changeTaskStatus: async (task: ITask) => {
        try {
            const res = await httpClient.post(`/task/${task.id}`, { task })
            return res.data
        } catch (error) {
            handleApiError(error)
        }
    },

    getTaskById: async (id: string) => {
        try {
            const res = await httpClient.get(`/task/${id}`)
            return res
        } catch (error) {
            handleApiError(error)
        }
    }
}

export { handleApiError };
