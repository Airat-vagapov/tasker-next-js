import {DynamicObject} from '@/types/global'

const monthNames:DynamicObject = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",

}

export const convertStringToTime = (str: string) => {
    const date = new Date(str)
    const dateDetail = {
        year: date.getFullYear(),
        month: monthNames[date.getMonth()],
        day: date.getDate(),
        hour: date.getHours(),
        minute: date.getMinutes(),
    }
    return `${dateDetail.day} ${dateDetail.month} ${dateDetail.year} ${dateDetail.hour}:${dateDetail.minute}`
}

export const capitalizeFirstLetter = (string: string) =>  {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  