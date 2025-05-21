import ErrorBottom from "@/components/ErrorBottom/ErrorBottom";
import { priorityColors } from "@/data/priority";
import Badge from "@/ui/Badge/Badge";
import Container from "@/ui/Container/Container";
import Content from "@/ui/Content/Content";
import ContentBlock from "@/ui/ContentBlock/ContentBlock";
import FieldRow from "@/ui/FieldRow/FieldRow";
import PageTitle from "@/ui/PageTitle/PageTitle";
import { capitalizeFirstLetter, convertStringToTime } from "@/utils/scripts";

type Props = {
    params: {
        id: string;
    }
}

export default async function Page({ params }: Props) {
    const { id } = await params;
    try {
        const res = await fetch(`http://localhost:8080/task/${id}`, {
            next: { revalidate: 60 },
        })

        let task;
        if (!res.ok) {
            if (res.status === 404) {
                throw new Error("Задача не найдена (404)");
            } else if (res.status >= 500) {
                throw new Error("500 - Ошибка сервера. Попробуйте позже.");
            } else {
                throw new Error(`Ошибка при загрузке задачи: ${res.statusText} (${res.status})`);
            }
        }
        const data = await res.json()

        task = data.result;
        console.log(task)
        const time = convertStringToTime(task.due_date);
        console.log(time)
        return (
            <>
                <Container>
                    <Content>
                        {task &&
                            (
                                <div className="flex flex-col gap-6">
                                    <PageTitle>{`#${task.id} ${task.title}`}</PageTitle>
                                    <div className="flex gap-10 items-stretch">
                                        <div className="basis-full">
                                            <ContentBlock classes="h-full">
                                                <div className="flex flex-col gap-4">
                                                    <p className="text-xl">Description</p>
                                                    <p>{task && task.description}</p>
                                                </div>
                                            </ContentBlock>
                                        </div>
                                        <div className="basis-[40%]">
                                            <ContentBlock classes="h-full">
                                                <div className="flex flex-col gap-4">
                                                    <p className="text-xl">Task information</p>
                                                    {/* <p>{task && task.priority}</p> */}

                                                    {task.status &&
                                                        <FieldRow label='Status'>
                                                            {task.status && <Badge>{capitalizeFirstLetter(task.status)}</Badge>}
                                                        </FieldRow>
                                                    }
                                                    {task.priority &&
                                                        <FieldRow label='Priority'>
                                                            <Badge color={priorityColors[task.priority as keyof typeof priorityColors]}>{task.priority}</Badge>
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
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </Content>
                </Container>

            </>
        )
    } catch (err) {
        // console.error(err);
        // console.error((err as Error).message);

        return (
            <>
                <ErrorBottom errorText={(err as Error).message} />
            </>

        )
    }
}