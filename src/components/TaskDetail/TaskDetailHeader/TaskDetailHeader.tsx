import TaskStatusChangeButton from "@/components/Task/TaskStatusChangeButton/TaskStatusChangeButton";
import { ITask } from "@/types/task";
import PageTitle from "@/ui/PageTitle/PageTitle";

type PageTitleProps = {
    children: React.ReactNode;
    task: ITask;
}

const TaskDetailHeader: React.FC<PageTitleProps> = ({ children, task }) => {
    return (
        <div className="flex justify-between items-center">
            <PageTitle>{children}</PageTitle>
            <TaskStatusChangeButton task={task}></TaskStatusChangeButton>

        </div>
    )
}
export default TaskDetailHeader;