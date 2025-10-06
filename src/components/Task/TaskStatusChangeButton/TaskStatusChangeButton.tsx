'use client'

import Button from "@/ui/Button/Button";
import { ITask } from "@/types/task";
import { useRouter } from 'next/navigation';
import { taskApi } from "@/api/taskApi";
import useChangeTasStatus from "@/hooks/useChangeTasStatus";
import { useQueryClient } from "@tanstack/react-query";

type TaskStatusChangeButtonProps = {
    task: ITask;
}

const TaskStatusChangeButton: React.FC<TaskStatusChangeButtonProps> = ({ task }) => {
    // Hooks
    const { changeTaskStatusHandler } = useChangeTasStatus(task.id)
    // Router
    // API
    const queryClient = useQueryClient()
    const taskStatusChange = () => {
        const updatedTask = { ...task, status_id: (task.status_id ?? 0) + 1 }
        changeTaskStatusHandler(updatedTask)
        // queryClient.setQueryData(['task', task.id], updatedTask);
    }
    return (
        <>
            <Button onClick={taskStatusChange} text={'Status change'}></Button>
        </>
    )
}
export default TaskStatusChangeButton;