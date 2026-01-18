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
import ErrorBlock from "../ErrorBlock/ErrorBlock";


const TaskBlock = () => {
    // Stores
    const deletedTask = useTaskStore((state) => state.deletedTask)
    const removeDeletedTask = useTaskStore((state) => state.removeDeletedTask)

    // Get URL params
    const searchParams = useSearchParams()
    const params = {
        task_id: searchParams.get('task_id') ?? undefined,
        search: searchParams.get('search') ?? undefined,
        // status: searchParams.get('status') ?? undefined,
        sortBy: searchParams.get('sortBy') ?? undefined,
        order: searchParams.get('order') ?? undefined,
        priority: searchParams.get('priority') ?? undefined,
    }

    // API
    const { data: tasks, isFetching: isFetchingTasks, error: tasksFetchError } = useQuery({
        queryKey: ['allTasks', params],
        queryFn: () => taskApi.getAllTasks(params)
    })

    // const errorData = tasksFetchError || activeTasksFetchError || doneTasksFetchError || null
    const errorData = tasksFetchError || null

    const isShowPreloader = isFetchingTasks

    return (
        <>
            {/* {(isFetchingActiveTasks || isFetchingDoneTasks || isFetchingTasks) && <Preloader></Preloader>} */}
            {(isShowPreloader) && <Preloader></Preloader>}

            <div className="flex flex-col gap-5">
                <FilterBlock params={params} />

                {tasks && <TaskList title={'All tasks'} data={tasks} />}
                {(tasks && tasks.length == 0) && <ErrorBlock
                    title={'Tasks not found'}
                    text='Try use another search query'
                    textPosition='center'
                // blockColor="white"
                />}


                {errorData && <ErrorBottom errorText={errorData?.message || 'Something went wrong'} />}
                {

                    <BottomNotification
                        content={{ title: 'Success', text: `Task #${deletedTask?.id} ${deletedTask?.title}  deleted is successful` }}
                        handleClose={() => {
                            removeDeletedTask()
                        }}
                        showButton={true}
                        showStatus={!!deletedTask}
                    />
                }

            </div>
        </>
    );
};

export default TaskBlock;
