import { ITask } from "@/types/task";

import Badge from '@/ui/Badge/Badge';

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
                "p-8 flex flex-col justify-center gap-4 rounded-sm bg-lightblack text-white"
            }
        >
            <div className="flex gap-2">
                {status && <Badge>{status}</Badge>}
                {priority && <Badge>{priority}</Badge>}
                <div className="ml-auto text-s text-gray">#{id}</div>
            </div>

            <p className="text-3xl">{title} </p>


            <p></p>
            {/* <p>{description}</p> */}
            <p>{author}</p>
            <p>{status}</p>

            <p>{created_at}</p>
            <p>{updated_at}</p>
            <p>{due_date}</p>
        </div>
    );
};

export default Task;
