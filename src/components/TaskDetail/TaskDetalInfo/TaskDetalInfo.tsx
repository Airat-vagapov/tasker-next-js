import { ITask } from "@/types/task";
import Badge from "@/ui/Badge/Badge";
import ContentBlock from "@/ui/ContentBlock/ContentBlock";
import FieldRow from "@/ui/FieldRow/FieldRow";

import { capitalizeFirstLetter, convertStringToTime } from "@/utils/scripts";
import { priorityColors } from "@/data/priority";

type TaskDetalInfoProps = {
    task: ITask
}

const TaskDetalInfo: React.FC<TaskDetalInfoProps> = ({ task }) => {
    return (
        <ContentBlock classes="h-full">
            <div className="flex flex-col gap-4">
                <p className="text-xl">Task information</p>

                {task.status &&
                    <FieldRow label='Status'>
                        {task.status && <Badge textSize="text-xs">
                            {capitalizeFirstLetter(task.status)}
                        </Badge>}
                    </FieldRow>
                }
                {task.priority &&
                    <FieldRow label='Priority'>
                        <Badge
                            textSize="text-xs"
                            color={priorityColors[task.priority as keyof typeof priorityColors]}
                        >{task.priority}
                        </Badge>
                    </FieldRow>
                }
                {task.created_at &&
                    <FieldRow label='Created at'>
                        {task.status && <p>{convertStringToTime(task.created_at)}</p>}
                    </FieldRow>
                }
                {task.updated_at &&
                    <FieldRow label='Updated at'>
                        {task.status && <p>{convertStringToTime(task.updated_at)}</p>}
                    </FieldRow>
                }
                {task.due_date &&
                    <FieldRow label='Due date'>
                        {task.status && <p>{convertStringToTime(task.due_date)}</p>}
                    </FieldRow>
                }
            </div>
        </ContentBlock>
    )
}

export default TaskDetalInfo;