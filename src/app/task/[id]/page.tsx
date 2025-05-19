import ErrorBottom from "@/components/ErrorBottom/ErrorBottom";
import Container from "@/ui/Container/Container";
import Content from "@/ui/Content/Content";
import ContentBlock from "@/ui/ContentBlock/ContentBlock";
import PageTitle from "@/ui/PageTitle/PageTitle";

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
        console.log(res.ok)
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
                                            <ContentBlock>
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
                                                    <p>{task && task.priority}</p>
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