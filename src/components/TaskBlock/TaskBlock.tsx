'use client'

import axios from "axios";
import Task from "@/components/Task/Task";
import { ITask } from "@/types/task";
import { useState } from "react";

interface ApiResponse {
    status: string;
    result: ITask[];
}

const TaskBlock = () => {
    const [taskData, setTaskData] = useState<ITask[]>([]);
    const getTasks = async () => {
        await axios
            .get<ApiResponse>("http://localhost:8080/tasks")
            .then((response) => {
                setTaskData(response.data.result);
            })
            .catch((error) => {
                console.error(error.message);
            });
    };
    getTasks();
    return (
        <div className="flex flex-col gap-8">
            {taskData &&
                taskData.map((item: ITask) => (
                    <Task key={item.id} id={item.id} text={item.name} />
                ))}
        </div>
    );
};

export default TaskBlock;
