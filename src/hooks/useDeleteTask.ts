import { useTaskListStore } from "@/store/store"

const useDeleteTask = () => {
    const updateState = useTaskListStore((state) => state.changeUpdate)

    const deleteTask = async (id:number, successChanger: (status:boolean) => void) => {
        try {
            const data = await fetch(`http://localhost:8080/task/${id}`, { 'method': 'DELETE' })
            if (data.ok) {
                updateState()
                successChanger(true);
            }
        } catch (err) {
            console.error(err);
            successChanger(false);
        }
    }

    return {deleteTask};
}

export default useDeleteTask;