'use client'

import { useTaskListStore } from "@/store/store";
import Button from "@/ui/Button/Button"

type DeleteButtonProps = {
    id: number;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ id }) => {
    const updateState = useTaskListStore((state) => state.changeUpdate)

    const deleteTask = async () => {
        try {
            const data = await fetch(`http://localhost:8080/task/${id}`, { 'method': 'DELETE' })
            if (data.ok) {
                updateState()
            }
        } catch (err) {
            console.error(err);
        }
    }




    return (
        <div>
            <Button onClick={deleteTask} text={'Delete task'}></Button>
        </div>
    )
}

export default DeleteButton;