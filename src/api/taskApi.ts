import { ITask, INewTaskData } from "@/types/task";
import axios from "axios";

interface ApiResponse {
    status: string;
    result: ITask[];
}

export const taskApi = {
    getAllTasks: async () => {
        const {data} = await axios
            .get<ApiResponse>("http://localhost:8080/tasks")
        return data.result
    },

    addTask: async (task: INewTaskData) => {
        console.log(task)
        const res = await axios.post("http://localhost:8080/task", task)
        return res
    }

}