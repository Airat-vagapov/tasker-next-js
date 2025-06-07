import useShowDoneTasks from "@/hooks/useShowDoneTasks";
import { ITask } from "@/types/task"
import Checkbox from "@/ui/Checkbox/Checkbox"

type TaskBlockControlProps = {
    setTaskData: (data: ITask[]) => void;
}

const TaskBlockControl: React.FC<TaskBlockControlProps> = ({ setTaskData }) => {
    const { getDoneTasks } = useShowDoneTasks()

    const handleGetDoneTasks = async () => {
        const data = await getDoneTasks();
        console.log(data)
        if (data) {
            setTaskData(data);
        } else {
            console.error("Failed to fetch done tasks");
        }
    }

    return (
        <div className="flex gap-2">
            <Checkbox id='ads' action={handleGetDoneTasks}>Show done tasks</Checkbox>
        </div>
    )
}
export default TaskBlockControl