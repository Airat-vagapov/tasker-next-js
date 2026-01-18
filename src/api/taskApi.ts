import { ITask, INewTaskData } from "@/types/task";
import {getAllTasksParams} from '@/api/tasks.types'
import axios from "axios";

interface ApiResponse {
    status: string;
    result: ITask[];
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const taskApi = {
    getAllTasks: async ({task_id, search, status, sortBy, order = 'desc', priority}: getAllTasksParams) => {
        try {
            const {data} = await axios.get<ApiResponse>(`${BASE_URL}/tasks`, 
                {params: {task_id, search, status, sortBy, order, priority}}
            )
            return data.result
        } catch (error) {
            handleApiError(error)
            throw error
        }
    },   
    
    getActiveTasks: async () => {
        try {
            const {data} = await axios
                .get<ApiResponse>(`${BASE_URL}/tasks/status?id=1,2`)
            return data.result
        } catch (error) {
            handleApiError(error)
            throw error
        }
        
    },

    getDoneTasks: async () => {
        try {
            const {data} = await axios
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

    deleteTask: async (id:number) => {

        (id)
        try {
            const res = await axios.delete(`${BASE_URL}/task/${id}`, {"method" : 'DELETE'})
            return res    
        } catch (error) {
            handleApiError(error)
            throw error
        }
        
    },

    // changeTaskStatus: async (id:number, task: ITask) => {
    changeTaskStatus: async (task: ITask) => {
        try {
            const res = await axios.post(`${BASE_URL}/task/${task.id}`, {task})
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
    (error)
    if (error.response?.status === 404) {
                throw new Error("Ошибка запроса (404)");
            } else if (error.response?.status >= 500) {
                throw new Error("500 - Ошибка сервера. Попробуйте позже.");
            } else {
                throw new Error(`Ошибка при загрузке данных: ${error.response?.statusText} (${error.response?.status}) \n ${error.response?.data.message}`);
                // throw new Error(error);
            }
}