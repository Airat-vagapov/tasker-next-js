import ContextMenu from "@/components/ContextMenu/ContextMenu";
import { useContextMenu } from "@/hooks/useContextMenu";

const TaskContextMenu = () => {
    const { isOpen, setIsOpen } = useContextMenu();

    return (

        <ContextMenu />
    )
}
export default TaskContextMenu;