import { ITask } from "@/types/task";

import Badge from '@/ui/Badge/Badge';
import { priorityColors } from "@/data/priority";
import { capitalizeFirstLetter } from "@/utils/scripts";

const Task: React.FC<ITask> = ({
    id,
    title,
    description,
    author,
    status,
    priority,
    created_at,
    updated_at,
    due_date,
}) => {


    return (
        <div
            className={
                "p-8 flex flex-col justify-center gap-4 rounded-xl bg-lightblack text-white"
            }
        >
            <div className="flex gap-2">
                {status && <Badge>{capitalizeFirstLetter(status)}</Badge>}
                {priority && <Badge color={priorityColors[priority as keyof typeof priorityColors]}>{priority}</Badge>}
                <div className="ml-auto text-s text-gray">#{id}</div>
            </div>

            <p className="text-3xl">{title} </p>
            {author && <p>{author}</p>}
        </div>
    );
};

export default Task;
