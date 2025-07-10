import { useState } from "react";
import { ITask } from "@/types/task"

import useShowDoneTasks from "@/hooks/useShowDoneTasks";
import Checkbox from "@/ui/Checkbox/Checkbox"
import { useTaskStore } from "@/store/store";

const TaskBlockControl = () => {
    // States
    const [isDoneTasks, setIsDoneTasks] = useState<boolean>(false) // Показываются только выполненные задачи

    // Hooks
    const { getDoneTasks } = useShowDoneTasks()

    // Store 
    const updateState = useTaskStore((state) => state.changeUpdate) // Обновление данных в блоке задач

    const handleGetDoneTasks = async () => {
        const newVal = !isDoneTasks
        setIsDoneTasks(newVal)

        const data = await getDoneTasks();
        if (data && newVal) {
            // setTaskData(data)
        } else {
            // updateState();
        }
    }

    return (
        <div className="flex gap-2">
            <Checkbox id='ads' action={() => {
                handleGetDoneTasks()

            }}>Show done tasks</Checkbox>
        </div>
    )
}
export default TaskBlockControl