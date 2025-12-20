'use client'
import ErrorBottom from "@/components/ErrorBottom/ErrorBottom";
import { useTaskStore } from "@/store/store";
import BottomNotification from "@/components/BottomNotification/BottomNotification"

import { useSearchParams } from 'next/navigation'
import { useQuery } from "@tanstack/react-query";
import { taskApi } from '@/api/taskApi'
import Preloader from "@/ui/Preloader/Preloader";
import TaskList from "./TaskList/TaskList";
import FilterBlock from "@/components/FilterBlock/FilterBlock";


const TaskBlock = () => {
    // Stores
    const deletedTask = useTaskStore((state) => state.deletedTask)
    const removeDeletedTask = useTaskStore((state) => state.removeDeletedTask)

    // Get URL params
    const searchParams = useSearchParams()
    const params = {
        search_id: searchParams.get('search_id') ?? undefined,
        status: searchParams.get('status') ?? undefined,
        sortBy: searchParams.get('sortBy') ?? undefined,
        order: searchParams.get('order') ?? undefined,
        search: searchParams.get('search') ?? undefined
    }

    console.log(params)

    // API
    const { data: tasks, isFetching: isFetchingTasks, error: tasksFetchError } = useQuery({
        queryKey: ['allTasks', params],
        queryFn: () => taskApi.getAllTasks(params)
    })

    // const { data: tasksDone, isFetching: isFetchingDoneTasks, error: doneTasksFetchError } = useQuery({
    //     queryKey: ['tasksDone'],
    //     queryFn: taskApi.getDoneTasks,
    //     staleTime: 1000 * 60 * 5
    // })

    // const { data: tasksActive, isFetching: isFetchingActiveTasks, error: activeTasksFetchError } = useQuery({
    //     queryKey: ['tasksActive'],
    //     queryFn: taskApi.getActiveTasks,
    //     staleTime: 1000 * 60 * 5
    // })

    // const errorData = tasksFetchError || activeTasksFetchError || doneTasksFetchError || null
    const errorData = tasksFetchError || null

    const isShowPreloader = isFetchingTasks

    return (
        <>
            {/* {(isFetchingActiveTasks || isFetchingDoneTasks || isFetchingTasks) && <Preloader></Preloader>} */}
            {(isShowPreloader) && <Preloader></Preloader>}

            <div className="flex flex-col gap-5">
                <FilterBlock />

                {tasks && <TaskList title={'All tasks'} data={tasks} />}
                {/* {tasksActive && <TaskList title={'Active tasks'} data={tasksActive} />} */}
                {/* {tasksDone && <TaskList title={'Done tasks'} data={tasksDone} />} */}
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
