import { ITask } from "@/types/task";
import statuses from "@/data/statuses";

type TaskSummaryBlockProps = {
    data: ITask[];
}

// interface IStatusCount {
//     statusName: string;
//     count: number;
// }

const TaskSummaryBlock: React.FC<TaskSummaryBlockProps> = ({ data }) => {
    console.log(data)
    let statusCount: Record<string, number> = {}
    statuses.forEach((statusName, index) => {
        console.log(statusName)
        statusCount[statusName] = data.filter((v) => v.status === statusName.toLowerCase()).length
    })

    return (
        <div>
            <div>TaskSummaryBlock</div>

            {Object.entries(statusCount).map(([statusName, count]) => (
                <div key={statusName}>
                    <span>{statusName}: {count}</span>
                </div>
            ))}
        </div>
    )
}

export default TaskSummaryBlock;