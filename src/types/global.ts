import { IconProps } from "@/ui/Icon/Icon";

export type DynamicObject = {
    [key: number]: string; // Ключ — число, значение — строка
};

export interface ISelectData {
    title: string,
    value: string,
}

export interface IContextMenuData {
    name: string;
    icon: IconProps;
    // action?: (func: ((b:boolean)=>void)) => Promise<void>;
    id: number; // ID задачи
    action?: (id: number)=>void;
}