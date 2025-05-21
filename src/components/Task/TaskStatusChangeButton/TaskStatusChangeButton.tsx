'use client'

import Button from "@/ui/Button/Button";
import { ITask } from "@/types/task";
import axios from "axios";
import { useRouter } from 'next/navigation';

type TaskStatusChangeButtonProps = {
    task: ITask;
}

const TaskStatusChangeButton: React.FC<TaskStatusChangeButtonProps> = ({ task }) => {
    const router = useRouter();
    
    const taskStatusChange = async () => {
        // const newId = (task.status_id ?? 0) + 1
        task.status_id = (task.status_id ?? 0) + 1
        console.log(task)

        const res = await axios.post(`http://localhost:8080/task/${task.id}`, { task })
        router.refresh()
    }
    return (
        <>
            <Button onClick={taskStatusChange} text={'Status change'}></Button>
        </>
    )

}

export default TaskStatusChangeButton;