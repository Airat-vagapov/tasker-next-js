import { taskApi } from "@/api/taskApi"
import { useTaskStore } from "@/store/store";
import { useMutation } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query";

const useDeleteTask = () => {
    // Store
    const deletedTask = useTaskStore((state) => state.deletedTask)
    // API
    const queryClient = useQueryClient();
    const deleteTask = useMutation({
        mutationFn: taskApi.deleteTask,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['tasks']})
            queryClient.invalidateQueries({queryKey:['tasksDone']})
            queryClient.invalidateQueries({queryKey:['tasksActive']})
        }
    })

    const deleteHandler = async (id:number) => {
        deleteTask.mutate(id)
    }

    return {deleteHandler};
}

export default useDeleteTask;