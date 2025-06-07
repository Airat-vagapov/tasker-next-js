import { ITask } from "@/types/task"
import Checkbox from "@/ui/Checkbox/Checkbox"

type TaskBlockControlProps = {
    setTaskData: (data: ITask[]) => void;
}

const TaskBlockControl: React.FC<TaskBlockControlProps> = ({ setTaskData }) => {

    return (
        <div className="flex gap-2">
            <Checkbox id='ads'>Show done tasks</Checkbox>
        </div>
    )
}
export default TaskBlockControl