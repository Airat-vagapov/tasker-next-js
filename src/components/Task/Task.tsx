import { ITask } from "@/types/task";

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
            <p>{id}</p>
            <p>{title}</p>
            {/* <p>{description}</p> */}
            <p>{author}</p>
            <p>{status}</p>
            <p>{priority}</p>
            <p>{created_at}</p>
            <p>{updated_at}</p>
            <p>{due_date}</p>
        </div>
    );
};

export default Task;
