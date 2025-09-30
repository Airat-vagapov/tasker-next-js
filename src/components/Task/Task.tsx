import { ITask } from "@/types/task";

import Badge from '@/ui/Badge/Badge';
import { priorityColors } from "@/data/priority";
import { capitalizeFirstLetter } from "@/utils/scripts";
import Link from "next/link";
import Button from "@/ui/Button/Button";
import DeleteButton from "./DeleteButton/DeleteButton";
import TaskContextMenu from "@/components/Task/TaskContextMenu/TaskContextMenu";
import { useTaskStore } from "@/store/store";

type TaskProps = {
    task: ITask;
    taskDeleteHandler?: (status: boolean) => void,
}

const Task: React.FC<TaskProps> = ({
    task,
    taskDeleteHandler
}) => {

    return (
        <>

            <div
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

                <div className="w-fit">
                    <Link href={`/task/${task?.id}`}>
                        <Button text={'Show details'}></Button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Task;
