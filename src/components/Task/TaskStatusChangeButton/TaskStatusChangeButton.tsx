'use client'

import Button from "@/ui/Button/Button";
import { ITask } from "@/types/task";
import { useRouter } from 'next/navigation';
import { taskApi } from "@/api/taskApi";
import useChangeTasStatus from "@/hooks/useChangeTasStatus";

type TaskStatusChangeButtonProps = {
    task: ITask;
}

const TaskStatusChangeButton: React.FC<TaskStatusChangeButtonProps> = ({ task }) => {
    // Hooks
    const { changeTaskStatusHandler } = useChangeTasStatus()
    // Router
    const router = useRouter();

    const taskStatusChange = async () => {
        task.status_id = (task.status_id ?? 0) + 1
        await changeTaskStatusHandler(task.id, task)
        // await taskApi.changeTaskStatus(task.id)
        // const res = await axios.post(`http://localhost:8080/task/${task.id}`, { task })
        router.refresh()
    }
    return (
        <>
            <Button onClick={taskStatusChange} text={'Status change'}></Button>
        </>
    )

}

export default TaskStatusChangeButton;