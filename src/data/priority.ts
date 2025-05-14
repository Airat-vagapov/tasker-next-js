import {ISelectData} from '@/types/global'

export const priorityData:ISelectData[] = [
    {title: "Low", value: 'low'},
    {title: "Medium", value: 'medium'},
    {title: "High", value: 'high'},
    {title: "Critical", value: 'critical'},
]

export const priorityColors = {
    Low: "bg-green after:bg-greenFull",
    Medium: "bg-yellow after:bg-yellowFull",
    High: "bg-orange after:bg-orangeFull",
    Critical: "bg-red after:bg-redFull",
}
