import {create} from 'zustand';

type TaskListStore = {
    isNeedUpdate: boolean;
    changeUpdate: () => void;
    resetUpdate: () => void;
}

export const useTaskListStore = create<TaskListStore>((set) => ({
    isNeedUpdate: false,
    changeUpdate: () => set({isNeedUpdate: true}),
    resetUpdate: () => set({isNeedUpdate: false}),
}))
