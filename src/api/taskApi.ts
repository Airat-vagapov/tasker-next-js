import { ITask, INewTaskData } from "@/types/task";
import axios from "axios";

interface ApiResponse {
    status: string;
    result: ITask[];
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const taskApi = {
    getAllTasks: async () => {
        const {data} = await axios
            .get<ApiResponse>("http://localhost:8080/tasks")
        return data.result
    },   
    
    getActiveTasks: async () => {
        const {data} = await axios
        .get<ApiResponse>("http://localhost:8080/tasks/status?id=1,2")
        return data.result
    },

    getDoneTasks: async () => {
        const {data} = await axios
        .get<ApiResponse>("http://localhost:8080/tasks/status?id=3")
        return data.result
    },
    
    addTask: async (task: INewTaskData) => {
        // console.log(task)
        const res = await axios.post("http://localhost:8080/task", task)
        return res
    },

    deleteTask: async (id:number) => {
        console.log(id)
        const res = await axios.delete(`http://localhost:8080/task/${id}`, {"method" : 'DELETE'})
        return res
    },

    // changeTaskStatus: async (id:number, task: ITask) => {
    changeTaskStatus: async (task: ITask) => {
        console.log(`перед запросом - ${task}`)
        const res = await axios.post(`http://localhost:8080/task/${task.id}`, {task})
        console.log(`тут - ${res}`)
        return res
    }

}