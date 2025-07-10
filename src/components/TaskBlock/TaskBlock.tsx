'use client'

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


const TaskBlock = () => {
    // Stores
    const [isTaskDeleted, setIsTaskDeleted] = useState<boolean>(false)
    const deletedTask = useTaskStore((state) => state.deletedTask)
    const removeDeletedTask = useTaskStore((state) => state.removeDeletedTask)
    const updateDeletedTask = useTaskStore((state) => state.updateDeletedTask)

    // API
    const { data: taskData, isFetching: isFetchingTasks, error: tasksFetchError } = useQuery({
        queryKey: ['tasks'],
        queryFn: taskApi.getAllTasks,
        staleTime: 1000 * 60 * 5
    })

    const { data: tasksDone, isFetching: isFetchingDoneTasks, error: doneTasksFetchError } = useQuery({
        queryKey: ['tasksDone'],
        queryFn: taskApi.getDoneTasks,
        staleTime: 1000 * 60 * 5
    })

    const errorData = tasksFetchError || doneTasksFetchError || null


    useEffect(() => {
        const closeNotification = setTimeout(() => {
            setIsTaskDeleted(false)
        }, 1500)
        return () => clearTimeout(closeNotification);
    }, [isTaskDeleted])

    return (
        <>
            {(isFetchingTasks || isFetchingDoneTasks) && <Preloader></Preloader>}

            <div className="flex flex-col gap-5">
                <TaskBlockControl />
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

                {errorData && <ErrorBottom errorText={errorData?.message || 'Something went wrong'} />}

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
