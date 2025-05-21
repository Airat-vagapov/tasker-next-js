import TaskStatusChangeButton from "@/components/Task/TaskStatusChangeButton/TaskStatusChangeButton";
import PageTitle from "@/ui/PageTitle/PageTitle";

type PageTitleProps = {
    children: React.ReactNode;
}

const TaskDetailHeader: React.FC<PageTitleProps> = ({ children }) => {
    return (
        <div>
            <PageTitle>{children}</PageTitle>
            <TaskStatusChangeButton></TaskStatusChangeButton>

        </div>
    )
}
export default TaskDetailHeader;