import { taskApi } from "@/api/taskApi";
import { ITask } from "@/types/task";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useChangeTasStatus = (id: number) => {
    // API
    const queryClient = useQueryClient();

    const changeTaskStatus = useMutation({
        mutationFn: taskApi.changeTaskStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['task', String(id)],
                exact: true,
            });
        },
    })
    const changeTaskStatusHandler = (task: ITask) => {
        changeTaskStatus.mutate(task)
    }

    return { changeTaskStatusHandler }
}

export default useChangeTasStatus;
