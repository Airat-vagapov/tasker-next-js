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
        const res = await fetch(`http://localhost:8080/task/${id}`)

        let task;
        if (res.ok) {
            const data = await res.json()

            task = data.result;
            console.log(task)
        }

        return (
            <>
                <Container>
                    <Content>
                        <div className="flex flex-col gap-6">
                            <ContentBlock>
                                {task && <PageTitle>{task.title}</PageTitle>}
                                {task && <div>{task.id}</div>}
                            </ContentBlock>

                            <ContentBlock>
                                <div>
                                    <p className="text-xl">Description</p>
                                    <p>{task && task.description}</p>
                                </div>
                            </ContentBlock>
                        </div>
                    </Content>
                </Container>

            </>


        )


    } catch (err) {
        console.log('ERROR HEAREA') // Fix typo in console log message
        console.error(err);
        console.error((err as Error).message);

        return (
            <>
                <ErrorBottom errorText={(err as Error).message} />
            </>

        )
    }
}