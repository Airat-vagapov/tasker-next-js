'use client'

import ErrorBottom from "@/components/ErrorBottom/ErrorBottom";
import { useTaskStore } from "@/store/store";
import BottomNotification from "@/components/BottomNotification/BottomNotification";
import TaskBlockControl from "@/components/TaskBlock/TaskBlockControl/TaskBlockControl";

import { useQuery } from "@tanstack/react-query";
import { taskApi } from '@/api/taskApi'
import Preloader from "@/ui/Preloader/Preloader";
import TaskList from "./TaskList/TaskList";


const TaskBlock = () => {
    // Stores
    const deletedTask = useTaskStore((state) => state.deletedTask)
    const removeDeletedTask = useTaskStore((state) => state.removeDeletedTask)

    // API
    const { data: tasksDone, isFetching: isFetchingDoneTasks, error: doneTasksFetchError } = useQuery({
        queryKey: ['tasksDone'],
        queryFn: taskApi.getDoneTasks,
        staleTime: 1000 * 60 * 5
    })

    const { data: tasksActive, isFetching: isFetchingActiveTasks, error: activeTasksFetchError } = useQuery({
        queryKey: ['tasksActive'],
        queryFn: taskApi.getActiveTasks,
        staleTime: 1000 * 60 * 5
    })

    const errorData = activeTasksFetchError || doneTasksFetchError || null

    return (
        <>
            {(isFetchingActiveTasks || isFetchingDoneTasks) && <Preloader></Preloader>}

            <div className="flex flex-col gap-5">
                {tasksActive && <TaskList title={'Active tasks'} data={tasksActive} />}
                {tasksDone && <TaskList title={'Done tasks'} data={tasksDone} />}
                {errorData && <ErrorBottom errorText={errorData?.message || 'Something went wrong'} />}

                <BottomNotification
                    content={{ title: 'Success', text: `Task #${deletedTask?.id} ${deletedTask?.title}  deleted is successful` }}
                    handleClose={() => {
                        removeDeletedTask()
                    }}
                    showButton={false}
                />
            </div>
        </>
    );
};

export default TaskBlock;
