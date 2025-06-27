import { ITask } from "@/types/task";
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
    }
}