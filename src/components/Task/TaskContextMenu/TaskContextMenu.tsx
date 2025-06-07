import ContextMenu from "@/components/ContextMenu/ContextMenu";
import useDeleteTask from "@/hooks/useDeleteTask";
import { IContextMenuData } from "@/types/global";

type TaskContextMenuProps = {
    id: number;
    deleteHandler?: () => void
}

const TaskContextMenu: React.FC<TaskContextMenuProps> = ({ id, deleteHandler }) => {
    const { deleteTask } = useDeleteTask()
    const handleDelete = () => {
        
        deleteTask(id, deleteHandler)
    }

    const menuData: IContextMenuData[] = [
        {
            name: 'Delete',
            icon: { name: 'delete' },
            action: handleDelete,
        }
    ]
    return (

        <ContextMenu menuData={menuData} />
    )
}
export default TaskContextMenu;