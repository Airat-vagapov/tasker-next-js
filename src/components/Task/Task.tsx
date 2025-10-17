import { ITask } from "@/types/task";

import Badge from '@/ui/Badge/Badge';
import { priorityColors } from "@/data/priority";
import { capitalizeFirstLetter } from "@/utils/scripts";
import Link from "next/link";
import TaskContextMenu from "@/components/Task/TaskContextMenu/TaskContextMenu";
import { useQueryClient } from "@tanstack/react-query";
import { taskApi } from '@/api/taskApi'


type TaskProps = {
    task: ITask;
    taskDeleteHandler?: (status: boolean) => void,
}

const Task: React.FC<TaskProps> = ({
    task,
    taskDeleteHandler
}) => {
    const queryClient = useQueryClient()

    const prefecthTask = async (id: string) => {
        await queryClient.prefetchQuery({
            queryKey: ['task', id],
            queryFn: () => taskApi.getTaskById(String(id))
        })
    }

    return (
        <>
            <Link href={`/task/${task?.id}`}>
                <div
                    // onMouseEnter={() => prefecthTask(String(task.id))}
                    className={
                        "p-8 flex flex-col justify-center gap-4 rounded-xl bg-lightblack text-white"
                    }
                >
                    <div className="flex gap-2">
                        {task?.status && <Badge>{capitalizeFirstLetter(task.status)}</Badge>}
                        {task?.priority && <Badge color={priorityColors[task.priority as keyof typeof priorityColors]}>{task.priority}</Badge>}
                        <div className="ml-auto"><TaskContextMenu id={task.id}
                        /></div>

                    </div>

                    <div className="flex items-baseline gap-2">
                        <span className="text-xl text-gray">#{task?.id}</span>
                        <p className="text-3xl">{task?.title} </p>
                    </div>
                    {task && <p>{task.author}</p>}

                    {/* <div className="w-fit">
                        <Link href={`/task/${task?.id}`}>
                            <Button text={'Show details'}></Button>
                        </Link>
                    </div> */}
                </div>
            </Link>
        </>
    );
};

export default Task;
