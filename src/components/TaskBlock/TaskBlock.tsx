'use client'

import axios from "axios";
import Task from "@/components/Task/Task";
import { ITask } from "@/types/task";
import { useEffect, useState } from "react";
import ErrorBottom from "@/components/ErrorBottom/ErrorBottom";
import { useTaskListStore } from "@/store/store";

interface ApiResponse {
    status: string;
    result: ITask[];
}

const TaskBlock = () => {
    // States
    const [taskData, setTaskData] = useState<ITask[]>([]);
    const [error, setError] = useState<string | null>(null);
    const isNeedUpdate = useTaskListStore((state) => state.isNeedUpdate)
    const resetUpdate = useTaskListStore((state) => state.resetUpdate)


    const getTasks = async () => {
        await axios
            .get<ApiResponse>("http://localhost:8080/tasks")
            .then((response) => {
                setTaskData(response.data.result);
            })
            .catch((error) => {
                if (error) {
                    console.error(error.message);
                    setError(error.message)
                }
            });
    };

    // Effects 
    useEffect(() => {
        getTasks();
    }, [])

    useEffect(() => {
        if (isNeedUpdate) {
            getTasks();
            resetUpdate();
        }
    }, [isNeedUpdate])

    return (
        <>
            <div className="flex flex-col gap-8">
                {taskData &&
                    taskData.map((item: ITask) => (
                        <Task
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            description={item.description}
                            author={item.author}
                            status={item.status}
                            priority={item.priority}
                            created_at={item.created_at}
                            updated_at={item.updated_at}
                            due_date={item.due_date}
                        />
                    ))}
            </div>

            {error && <ErrorBottom errorText={error} />}

        </>
    );
};

export default TaskBlock;
