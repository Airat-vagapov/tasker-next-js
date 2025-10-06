import { useQuery } from "@tanstack/react-query"
import { taskApi } from "@/api/taskApi"



export const useGetTask = (id: string) =>{ 
    return useQuery({
        queryKey: ['task', id], 
        queryFn: () => taskApi.getTaskById(id) ,
        enabled: !!id,
    })
}