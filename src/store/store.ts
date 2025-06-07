import { ITask } from '@/types/task';
import {create} from 'zustand';

type TaskStore = {
    isNeedUpdate: boolean;
    deletedTask: ITask | null;
    changeUpdate: () => void;
    resetUpdate: () => void;
    updateDeletedTask: (task: ITask | null) => void;
    removeDeletedTask: () => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
    isNeedUpdate: false,
    changeUpdate: () => set({isNeedUpdate: true}),
    resetUpdate: () => set({isNeedUpdate: false}),
    deletedTask: null,
    updateDeletedTask: (task: ITask | null) => set({deletedTask: task}), 
    removeDeletedTask: () => set({deletedTask: null}),
}))
