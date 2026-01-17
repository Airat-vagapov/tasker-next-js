import { taskApi } from "@/api/taskApi"
import { useTaskStore } from "@/store/store";
import { useMutation } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query";

const useDeleteTask = () => {
    // Store
    const deletedTask = useTaskStore((state) => state.deletedTask)
    const updateDeletedTask = useTaskStore((state)=>state.updateDeletedTask)
    // API
    const queryClient = useQueryClient();
    const deleteTask = useMutation({
        mutationFn: taskApi.deleteTask,
        onSuccess: (data) => {
            updateDeletedTask(data.data.result)
            queryClient.invalidateQueries({ queryKey: ['allTasks'] });
        }
    })

    const deleteHandler = async (id:number) => {
        deleteTask.mutate(id)
    }

    return {deleteHandler};
}

export default useDeleteTask;