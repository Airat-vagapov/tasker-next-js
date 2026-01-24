import Task from "@/components/Task/Task";
import { ITask } from "@/types/task";
import TaskSummaryBlock from "../TaskSummaryBlock/TaskSummaryBlock";

type TaskListProps = {
    title: string,
    data: ITask[]
}

const TaskList: React.FC<TaskListProps> = ({ title, data }) => {
    return (
        <div className="flex flex-col gap-8">
            {title && <p className="text-3xl">{`${title}`} <span className=" text-base text-gray align-middle">{data.length}</span></p>}
            <TaskSummaryBlock data={data} />
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