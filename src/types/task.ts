export interface ITask {
    id: number;
    title: string;
    description: string;
    author?: string;
    status?: string;
    status_id?: number;
    priority: string;
    created_at?: string;
    updated_at?: string;
    due_date?: string;
}
