'use client'

import axios from "axios";
import Task from "@/components/Task/Task";
import { ITask } from "@/types/task";
import { useEffect, useState } from "react";
import ErrorBottom from "@/components/ErrorBottom/ErrorBottom";
import { useTaskStore } from "@/store/store";
import BottomNotification from "@/components/BottomNotification/BottomNotification";
import TaskBlockControl from "@/components/TaskBlock/TaskBlockControl/TaskBlockControl";

import { useQuery } from "@tanstack/react-query";
import { taskApi } from '@/api/taskApi'
import Preloader from "@/ui/Preloader/Preloader";

interface ApiResponse {
    status: string;
    result: ITask[];
}

const TaskBlock = () => {
    // States
    const [taskData, setTaskData] = useState<ITask[]>([]);
    const [errorData, setErrorData] = useState<string | null>(null);

    // Stores
    const isNeedUpdate = useTaskStore((state) => state.isNeedUpdate)
    const resetUpdate = useTaskStore((state) => state.resetUpdate)
    const [isTaskDeleted, setIsTaskDeleted] = useState<boolean>(false)
    const deletedTask = useTaskStore((state) => state.deletedTask)
    const removeDeletedTask = useTaskStore((state) => state.removeDeletedTask)
    const updateDeletedTask = useTaskStore((state) => state.updateDeletedTask)

    // API
    const { data, isFetching, error, isSuccess } = useQuery({
        queryKey: ['tasks'],
        queryFn: taskApi.getAllTasks,
        staleTime: 1000 * 60 * 5
    })
    useEffect(() => {
        if (data) { setTaskData(data) }
    }, [data])

    useEffect(() => {
        if (isSuccess) setErrorData(null)
    }, [isSuccess])

    useEffect(() => {
        if (error) {
            setErrorData(error.message)
            console.log(error)
        }
    }, [error])

    // const getTasks = async () => {
    //     await axios
    //         .get<ApiResponse>("http://localhost:8080/tasks")
    //         .then((response) => {
    //             setTaskData(response.data.result);
    //         })
    //         .catch((error) => {
    //             if (error) {
    //                 console.error(error.message);
    //                 setError(error.message)
    //             }
    //         });
    // };

    // Effects 
    // useEffect(() => {
    //     getTasks();
    // }, [])

    useEffect(() => {
        if (isNeedUpdate) {
            // getTasks();
            resetUpdate();
        }
    }, [isNeedUpdate])

    useEffect(() => {
        const closeNotification = setTimeout(() => {
            setIsTaskDeleted(false)
        }, 1500)
        return () => clearTimeout(closeNotification);
    }, [isTaskDeleted])

    console.log(isFetching)
    return (
        <>
            {isFetching && <Preloader></Preloader>}

            <div className="flex flex-col gap-5">
                <TaskBlockControl setTaskData={setTaskData} />
                <div className="flex flex-col gap-8">
                    {taskData &&
                        taskData.map((item: ITask) => (
                            <Task
                                key={item.id}
                                task={item}
                                taskDeleteHandler={() => {
                                    setIsTaskDeleted(true)
                                    updateDeletedTask(item)
                                }}
                            />
                        ))}
                </div>

                {errorData && <ErrorBottom errorText={errorData} />}

                <BottomNotification
                    content={{ title: 'Success', text: `Task #${deletedTask?.id} ${deletedTask?.title}  deleted is successful` }}
                    showStatus={isTaskDeleted}
                    handleClose={() => {
                        setIsTaskDeleted(false)
                        removeDeletedTask()
                    }}
                    showButton={false}
                />
            </div>
        </>
    );
};

export default TaskBlock;
