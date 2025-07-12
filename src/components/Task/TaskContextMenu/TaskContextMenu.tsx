import ContextMenu from "@/components/ContextMenu/ContextMenu";
import useDeleteTask from "@/hooks/useDeleteTask";
import { IContextMenuData } from "@/types/global";

type TaskContextMenuProps = {
    id: number;
    deleteHandlerOuter?: () => void
}

const TaskContextMenu: React.FC<TaskContextMenuProps> = ({ id, deleteHandlerOuter }) => {
    const { deleteHandler } = useDeleteTask()
    // const handleDelete = () => {

    //     deleteTask(id, deleteHandler)
    // }

    const menuData: IContextMenuData[] = [
        {
            name: 'Delete',
            icon: { name: 'delete' },
            action: () => deleteHandler(id),
            // taskId: id
        }
    ]
    return (

        <ContextMenu menuData={menuData} />
    )
}
export default TaskContextMenu;