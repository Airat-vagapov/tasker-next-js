'use client'

import { useGetTask } from "@/hooks/useGetTask";
import TaskDetailHeader from "@/components/TaskDetail/TaskDetailHeader/TaskDetailHeader";
import ContentBlock from "@/ui/ContentBlock/ContentBlock";
import TaskDetalInfo from "./TaskDetalInfo/TaskDetalInfo";
import ErrorBottom from "@/components/ErrorBottom/ErrorBottom";
import Preloader from "@/ui/Preloader/Preloader";

import ReactMarkdown from 'react-markdown';



type TaskDetailProps = {
    id: string
}

const TaskDetail: React.FC<TaskDetailProps> = (id) => {
    const { data, error, isError, isFetching } = useGetTask(id.id)
    const task = data?.data.result
    return (
        <>
            {isFetching && <Preloader />}
            {task &&
                <div className="flex flex-col gap-6">
                    <TaskDetailHeader task={task}><span className="text-gray text-2xl">#{task.id}</span>{` ${task.title}`}</TaskDetailHeader>
                    <div className="flex gap-10 items-stretch">
                        <div className="basis-full">
                            <ContentBlock classes="h-full">
                                <div className="flex flex-col gap-4">
                                    <p className="text-xl">Description</p>
                                    <p>
                                        {task && task.description &&
                                            <>
                                                <ReactMarkdown>{task.description}</ReactMarkdown>
                                            </>
                                        }

                                    </p>
                                </div>
                            </ContentBlock>
                        </div>
                        <div className="basis-[40%]">
                            <TaskDetalInfo task={task}></TaskDetalInfo>
                        </div>
                    </div>
                </div>
            }
            {isError &&
                <>
                    <ErrorBottom errorText={(error as Error).message} />
                </>}

        </>
    )
}

export default TaskDetail