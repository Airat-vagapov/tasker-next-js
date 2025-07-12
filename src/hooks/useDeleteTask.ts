import { useTaskStore } from "@/store/store"
import { taskApi } from "@/api/taskApi"
import { useMutation } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query";

const useDeleteTask = () => {
    // const updateState = useTaskStore((state) => state.changeUpdate)
    const queryClient = useQueryClient();

    const deleteTask = useMutation({
        mutationFn: taskApi.deleteTask,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['tasks']})
            queryClient.invalidateQueries({queryKey:['tasksDone']})
            queryClient.invalidateQueries({queryKey:['tasksActive']})
        }
    })

    // const deleteHandler = async (id:number, successChanger?: (status:boolean) => void) => {
    const deleteHandler = async (id:number) => {
        deleteTask.mutate(id)

        // try {
        //     const data = await fetch(`http://localhost:8080/task/${id}`, { 'method': 'DELETE' })
        //     if (data.ok) {
        //         updateState()
        //         successChanger(true);
        //     }
        // } catch (err) {
        //     console.error(err);
        //     successChanger(false);
        // }
    }

    return {deleteHandler};
}

export default useDeleteTask;