import { ITask } from "@/types/task";

type TaskSummaryBlockProps = {
    data: ITask[];
}

const TaskSummaryBlock: React.FC<TaskSummaryBlockProps> = ({ data }) => {
    return (
        <div>TaskSummaryBlock</div>
    )
}

export default TaskSummaryBlock;