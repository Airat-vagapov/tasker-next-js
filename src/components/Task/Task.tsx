import { ITask } from "@/types/task";

const Task: React.FC<ITask> = ({ id, name }) => {
    return (
        <div
            className={
                "p-8 flex flex-col justify-center gap-4 rounded-sm bg-lightblack text-white"
            }
        >
            <p>{id}</p>
            <p>{name}</p>
        </div>
    );
};

export default Task;
