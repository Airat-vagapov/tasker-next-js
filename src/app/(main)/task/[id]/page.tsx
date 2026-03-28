import Container from "@/ui/Container/Container";
import Content from "@/ui/Content/Content";

import TaskDetail from "@/components/TaskDetail/TaskDetail";



type Props = {
    params: {
        id: string;
    }
}

export default async function Page({ params }: Props) {
    const { id } = await params;
    return (
        <>
            <Container>
                <Content>
                    <TaskDetail id={id}></TaskDetail>
                </Content>
            </Container>
        </>
    )
    // return (
    //     <>
    //         <ErrorBottom errorText={(err as Error).message} />
    //     </>
    // )
}