import Task from "@/components/Task/Task";
import { ITask } from "@/types/task";

type TaskListProps = {
    title: string,
    data: ITask[]
}

const TaskList: React.FC<TaskListProps> = ({ title, data }) => {
    return (
        <div className="flex flex-col gap-8">
            {title && <p className="text-3xl">{`${title}`} <span className=" text-base text-gray align-middle">{data.length}</span></p>}

            {data &&
                data.map((item: ITask) => (
                    <Task
                        key={item.id}
                        task={item}
                    />
                ))}
        </div>
    )
}

export default TaskList;