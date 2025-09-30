import { taskApi } from "@/api/taskApi";
import { ITask } from "@/types/task";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useChangeTasStatus = () => {
    // API
    const queryClient = useQueryClient();
    const changeTaskStatus = useMutation({
        mutationFn: taskApi.changeTaskStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasksDone'] })
            queryClient.invalidateQueries({ queryKey: ['tasksActive'] })
        }
    })

    const changeTaskStatusHandler = async (id: number, task: ITask) => {
        changeTaskStatus.mutate(task)
    }

    return { changeTaskStatusHandler }
}

export default useChangeTasStatus;